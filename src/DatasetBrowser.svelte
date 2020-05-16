<script>
import SubjExpand from './images/SubjExpand.svelte';
import ObjExpand from './images/ObjExpand.svelte';
import BrowserRow from "./BrowserRow.svelte"
import * as Factory from "@rdfjs/data-model";
import DatasetManager from "./DatasetUtils";
export let value;
export let subject = null;
let subjectFilter = null;
export let object = null;
let objectFilter = null;
export let graph = null;
let graphFilter = null;
let newQuad = null;
let addingQuad = false;
const dm = new DatasetManager(value, (ds) => value = value);
if (subject) {
    if (typeof subject === "string") {
        subjectFilter = Factory.namedNode(subject);
    }
    else {
        subjectFilter = subject;
    }
}
if (object) {
    if (typeof object === "string") {
        objectFilter = Factory.namedNode(object);
    }
    else {
        objectFilter = object;
    }
}
if (graph) {
    if (typeof graph === "string") {
        graphFilter = Factory.namedNode(graph);
    }
    else {
        graphFilter = graph;
    }
}
$: if (newQuad !== null) {
    addNewQuad(newQuad);
    newQuad = null;
}
let orderedQuads;
//value is just us so it reacts for that var
$: orderedQuads = value || subjectFilter || objectFilter ? getOrderedQuads() : null;
function addNewQuad(q) {
    addingQuad = false;
    value.add(q);
    value = value;
}
function addQuad() {
    newQuad = null;
    addingQuad = true;
}
function getOrderedQuads() {
    const result = dm.orderQuads(value.match(subjectFilter, undefined, objectFilter, graphFilter));
    console.log("getOrderedQuads", result);
    return result;
}
function setSubject(event) {
    objectFilter = null;
    subjectFilter = event.detail;
}
function setObject(event) {
    console.log("setobj", event.detail);
    objectFilter = event.detail;
    subjectFilter = null;
}

</script>

<div>
    {#if subjectFilter}
        <h2>
        {subjectFilter.value}
        <SubjExpand size="2em"/>
        </h2>
    {/if}
    {#if objectFilter}
        <h2 style="text-align: end;">
        <ObjExpand size="2em"/>
        {objectFilter.value}
        </h2>
    {/if}
    {#each orderedQuads as t (t.id)}
    <span>
      <BrowserRow bind:value={t.quad} fixedSubject={subjectFilter} 
      fixedGraph={graphFilter} fixedObject={objectFilter}
      on:subject={setSubject} on:object={setObject} />
    </span>
    {/each}
    {#if addingQuad}
        <div>
            <BrowserRow bind:value={newQuad} fixedSubject={subjectFilter} 
            fixedGraph={graphFilter} fixedObject={objectFilter}/>
        </div>
    {:else}
        <div>
            <button on:click={addQuad}>Add attribute</button>
        </div>
    {/if}
</div>