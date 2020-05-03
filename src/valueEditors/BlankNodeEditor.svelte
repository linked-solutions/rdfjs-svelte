<script>
  import * as Factory from "@rdfjs/data-model";
  export let value;
  let content;
  $: content = value.value;
  function userChange(e) {
    value = Factory.blankNode(content);
  }
</script>

<div>
  <input type="text" size="5" bind:value={content} on:input={userChange} />
</div>
