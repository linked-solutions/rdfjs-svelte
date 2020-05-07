<script>
  import * as Factory from "@rdfjs/data-model";
  import HtmlEditor from "./valueEditors/HtmlEditor.svelte";
  import SimpleLiteralEditor from "./valueEditors/SimpleLiteralEditor.svelte";
  import NamedNodeEditor from "./valueEditors/NamedNodeEditor.svelte";
  import BlankNodeEditor from "./valueEditors/BlankNodeEditor.svelte";

  export let value;

  function getType() {
    const types = {
      "http://www.w3.org/1999/02/22-rdf-syntax-ns#HTML": "html",
      "http://www.w3.org/2001/XMLSchema#string": "label",
      "http://www.w3.org/1999/02/22-rdf-syntax-ns#langString": "langString"
    };
    return value.termType === "Literal"
      ? types[value.datatype.value]
        ? types[value.datatype.value]
        : "literal"
      : value.termType === "NamedNode"
      ? "IRI"
      : value.termType === "DefaultGraph"
      ? "DefaultGraph"
      : "BlankNode";
  }
  $: type = getType(value);
</script>

<div class="f" :key="type">
  {#if type === 'html'}
    <HtmlEditor bind:value on:input />
  {:else if type === 'IRI'}
    <NamedNodeEditor bind:value on:input />
  {:else if type === 'BlankNode'}
    <BlankNodeEditor bind:value on:input />
  {:else if type === 'label' || type === 'langString'}
    <SimpleLiteralEditor bind:value on:input />
  {:else}
    <div v-else>No value editor for {type}</div>
  {/if}
</div>
