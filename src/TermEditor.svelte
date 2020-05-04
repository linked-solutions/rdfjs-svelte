<script>
  import * as Factory from "@rdfjs/data-model";
  import ExistingTermEditor from "./ExistingTermEditor.svelte";

  export let value;
  export let termTypes = null;
  let type = null;
  const availableOptions = {
    html: Factory.literal(
      "",
      Factory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#HTML")
    ),
    label: Factory.literal(""),
    "label with language": Factory.literal("", "en"),
    IRI: Factory.namedNode(""),
    "Blank Node": Factory.blankNode(),
    DefaultGraph: Factory.defaultGraph()
  };

  let options = termTypes
    ? Object.fromEntries(
        Object.entries(availableOptions).filter(
          ([k, n]) => termTypes.indexOf(n.termType) > -1
        )
      )
    : availableOptions;

  let optionLabels = Object.keys(options)
  function typeSelected(event) {
    console.log("termTypes: ", termTypes);
    console.log("typeSelected: ", event);
    console.log("type: ", type);
    if (type !== null) {
      console.log("maps to: ", options[type]);
      value = options[type];
    }
  }
  function reset() {
    console.log("termTypes: ", termTypes);
    console.log("resetting editor", value);
    type = null;
    value = null;
  }
</script>


<div class="te">
  {#if !value}
    <select bind:value={type} on:change={typeSelected}>
      <option disabled value={null}>Select type</option>
      {#each Object.keys(options) as option}
      <option value={option}>
        { option }
      </option>
      {/each}
    </select>
  {:else}
    <span>
      <button type="button" class="icon" on:click={reset}>
        <svg viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12,6L7,11H17L12,6M7,13L12,18L17,13H7Z" />
        </svg>
      </button>
      {#if value !== null}
      <ExistingTermEditor
        bind:value={value}
        on:input />
      {/if}
    </span>
  {/if}
</div>
