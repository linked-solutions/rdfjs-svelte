import * as Factory from "@rdfjs/data-model";
import Dataset from "@rdfjs/dataset";
import QuadEditor from "./QuadEditor.svelte";
import * as RDF from "rdf-js";

type QuadHolder = {
    id: any;
    quad: RDF.Quad;
};

/**
 * provided methods to list, add, remove and replace quads
 */
export default class DatasetManager {
    constructor(public dataset: RDF.DatasetCore, 
        public changeListener: (ds: RDF.DatasetCore) => void) {
    }

    previousHolders = new Map<RDF.Quad, QuadHolder>();

    orderQuads(quads: RDF.DatasetCore) {
        let result = new Array<QuadHolder>();
        let i = 0;
        const currentHolders: Map<RDF.Quad, QuadHolder> = new Map();
        for (let quad of quads) {
            let holder = this.previousHolders.get(quad)
            const self = this;
            if (!holder) {
                holder = {
                    id: "",
                    get quad() {
                        return quad;
                    },
                    set quad(q: RDF.Quad) {
                        if (quad.equals(q)) {
                            return;
                        }
                        self.previousHolders.delete(quad);
                        self.dataset.delete(quad);
                        if (q !== null) {
                            self.dataset.add(q);
                        } else {
                            console.log("removing quad")
                        }
                        quad = q;
                        self.previousHolders.set(q, this);
                        self.changeListener(self.dataset);
                    }
                };
            }
            this.previousHolders.set(quad, holder);
            result.push(holder);
        }
        //previousHolders = currentHolders;
        const sorted = result.sort((a: QuadHolder, b: QuadHolder) => {
            interface chainable {
                then(f: () => number): chainable;
                finally(t: () => number): number;
            }

            function first(f: () => number): chainable {
                const fr = f();
                const result = {
                    then: function (t: () => number): chainable {
                        if (fr === 0) {
                            return first(t);
                        } else {
                            return result;
                        }
                    },
                    finally: function (t: () => number) {
                        if (fr === 0) {
                            return t();
                        } else {
                            return fr;
                        }
                    }
                }
                return result;
            }

            function compare(field: 'graph' | 'subject' | 'predicate' | 'object'): () => number {
                return () => {
                    if (a.quad[field].value < b.quad[field].value) {
                        return -1;
                    } else {
                        if (a.quad[field].value > b.quad[field].value) {
                            return 1;
                        } else {
                            return 0;
                        }
                    }
                }
            }
            return first(compare('graph'))
                .then(compare('subject'))
                .then(compare('predicate'))
                .finally(compare('object'));
        });
        const zero = { id: 0 }
        const max = sorted.reduce((previous, current) => previous.id > current.id ? previous : current, zero);
        let j = max.id;
        sorted.forEach(holder => {
            if (!holder.id) {
                holder.id = ++j;
            }
        });
        //console.log(uuid, "sorted", JSON.stringify(sorted));
        return sorted;
    }
    orderedQuads() {
        return this.orderQuads(this.dataset);
    }
}