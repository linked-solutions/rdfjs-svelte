<script>
  import TermEditor from "./TermEditor.svelte";
  import ExistingTermEditor from "./ExistingTermEditor.svelte";
  import ResourceNavigator from "./ResourceNavigator.svelte";
  import Factory from "@rdfjs/data-model";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let value;
  export let fixedSubject;
  export let fixedObject;
  export let fixedGraph;
  export let labels = false;
  let subject = value ? value.subject : fixedSubject ? fixedSubject : null;
  let predicate = value ? value.predicate : Factory.namedNode("");
  let object = value ? value.object : fixedObject ? fixedObject : null;
  let graph = value ? value.graph : fixedGraph ? fixedGraph : null;
  const elementChanged = function (val) {
    if (subject && predicate && object && graph) {
      const newQuad = Factory.quad(subject, predicate, object, graph);
      if (!value || !newQuad.equals(value)) {
        console.log("new quad", newQuad);
        value = newQuad;
      }
    }
  };
  $: elementChanged(subject);
  $: elementChanged(predicate);
  $: elementChanged(object);
  $: elementChanged(graph);
  $: setElements(value);
  function setElements(quad) {
    if (quad !== null) {
      subject = quad.subject;
      predicate = quad.predicate;
      object = quad.object;
      graph = quad.graph;
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

  .placeholder {
    grid-row: 2/ span 1;
    flex-grow: 1;
  }
</style>

<div class="area">
  {#if !fixedSubject}
    {#if labels}
      <label>Subject:</label>
    {/if}
    <div class="element">
      <TermEditor bind:value={subject} termTypes={['BlankNode', 'NamedNode']} />
      {#if subject && subject.termType !== 'Literal'}
        <ResourceNavigator resource={subject} on:subject on:object />
      {/if}
    </div>
  {:else}
  <div class="placeholder"></div>
  {/if}
  {#if labels}
    <label>Predicate:</label>
  {/if}
  <div class="element">
    <ExistingTermEditor bind:value={predicate} />
  </div>
  {#if !fixedObject}
    {#if labels}
      <label>Object:</label>
    {/if}
    <div class="element">
      <TermEditor
        bind:value={object}
        termTypes={['BlankNode', 'NamedNode', 'Literal']} />
      {#if object && object.termType !== 'Literal'}
        <ResourceNavigator resource={object} on:subject on:object />
      {/if}
    </div>
  {:else}
  <div class="placeholder"></div>
  {/if}
  {#if !fixedGraph}
    <div class="element">
      <TermEditor
        bind:value={graph}
        termTypes={['BlankNode', 'NamedNode', 'DefaultGraph']} />
    </div>
  {/if}
</div>
