<script>
  import DatasetManager from "./DatasetUtils";
  import * as Factory from "@rdfjs/data-model";
  import Dataset from "@rdfjs/dataset";
  import QuadEditor from "./QuadEditor.svelte";

  export let value;

  let addingQuad = false;

  let newQuad = null;

  let dm = new DatasetManager(value, (ds) => value = value);

  $: if (newQuad !== null) {
    addNewQuad(newQuad);
    newQuad = null;
  }

  $: orderedQuads = getOrderedQuads(value);

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
    const r = dm.orderQuads(value);
    return r;
  }
</script>

<div>
{#each orderedQuads as t (t.id)}
  <span>
    <QuadEditor bind:value={t.quad} />
  </span>
{/each}
{#if addingQuad}
  <div>
    <QuadEditor bind:value={newQuad} />
  </div>
{:else}
  <div>
    <button on:click={addQuad}>Add quad</button>
  </div>
{/if}
</div>
