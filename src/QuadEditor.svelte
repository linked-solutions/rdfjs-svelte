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
  .compact {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    align-items: start;
  }
</style>

<div class={labels?"labeled":"compact"}>

  {#if labels}
    <label>Subject:</label>
  {/if}
  <TermEditor bind:value={subject} termTypes="['BlankNode', 'NamedNode']" />
  {#if labels}
    <label>Predicate:</label>
  {/if}
  <ExistingTermEditor bind:value={predicate} />
  {#if labels}
    <label>Object:</label>
  {/if}
  <TermEditor
    bind:value={object}
    termTypes="['BlankNode', 'NamedNode', 'Literal']" />
  {#if labels}
    <label>Graph:</label>
  {/if}
  <TermEditor
    bind:value={graph}
    termTypes="['BlankNode', 'NamedNode', 'DefaultGraph']" />
</div>
