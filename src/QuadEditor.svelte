<script>
  import * as Factory from "@rdfjs/data-model";
  import TermEditor from "./TermEditor.svelte";
  import ExistingTermEditor from "./ExistingTermEditor.svelte";

  let subject, predicate, object, graph;
  export let value;
  export let labels = false;

  $: elementChanged(subject);
  $: elementChanged(predicate);
  $: elementChanged(object);
  $: elementChanged(graph);

  $: valueChanged(value);

  function valueChanged(v) {
    subject = v ? v.subject : null;
    predicate = value ? value.predicate : Factory.namedNode("");
    object = value ? value.object : null;
    graph = value ? value.graph : null;
  }

  function elementChanged(val) {
    if (subject && predicate && object && graph) {
      value = Factory.quad(subject, predicate, object, graph);
    }
  }
</script>

<style>
  .area {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    grid-gap: 0 1em;
    gap: 0 1em;
    align-items: start;
    margin-bottom: 0.8rem;
  }

  .element {
    display: flex;
    align-items: left;
    grid-row: 2/ span 1;
    flex-grow: 4;
  }

  label {
    grid-row: 1/ span 1;
  }

</style>

<div class="area">

  {#if labels}
    <label>Subject:</label>
  {/if}
  <div class="element">
  <TermEditor bind:value={subject} termTypes="['BlankNode', 'NamedNode']" />
  </div>
  {#if labels}
    <label>Predicate:</label>
  {/if}
  <div class="element">
  <ExistingTermEditor bind:value={predicate} />
  </div>
  {#if labels}
    <label>Object:</label>
  {/if}
  <div class="element">
  <TermEditor
    bind:value={object}
    termTypes="['BlankNode', 'NamedNode', 'Literal']" />
  </div>
  {#if labels}
    <label>Graph:</label>
  {/if}
  <div class="element">
  <TermEditor
    bind:value={graph}
    termTypes="['BlankNode', 'NamedNode', 'DefaultGraph']" />
  </div>
</div>
