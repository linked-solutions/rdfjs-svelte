<script>
  import Factory from "@rdfjs/data-model";
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

  const previousValues = new Map();

  function typeSelected (event) {
      console.log("this.termTypes: ",termTypes);
      console.log("typeSelected: ",event);
      console.log("this.type: ",type);
      if (!type) {
          return;
      }
      const previousValue = previousValues.get(type);
      if (previousValue && previousValue.value.length > 0 
              && window.confirm("Restoring previous value")) { 
              value = previousValue;
      } else {
          console.log("maps to: ",options[(type)]);
          value = options[type];
      }
  }

  function reset() {
    previousValues.set(compType(), value);
    type = null;
    value = null;
  }

  function compType () {
        const types = {
            "http://www.w3.org/1999/02/22-rdf-syntax-ns#HTML": "html",
            "http://www.w3.org/2001/XMLSchema#string": "label",
            "http://www.w3.org/1999/02/22-rdf-syntax-ns#langString": "langString"
        };
        return (
            value !== null ?
                value.termType === "Literal" ? 
                    types[value.datatype.value] ?
                        types[value.datatype.value] : "literal"
                : value.termType === "NamedNode" ? "IRI" 
                : value.termType === "DefaultGraph" ? "DefaultGraph"
                : "BlankNode"
                : null );
    }
</script>

<style>
  span {
    display: flex;
  }

  svg {
    height: 1em;
  }
</style>

<div class="te">
  {#if !value}
    <!-- svelte-ignore a11y-no-onchange -->
    <select bind:value={type} on:change={typeSelected}>
      <option disabled value={null}>Select type</option>
      {#each Object.keys(options) as option}
        <option value={option}>{option}</option>
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
        <ExistingTermEditor bind:value on:input />
      {/if}
    </span>
  {/if}
</div>
