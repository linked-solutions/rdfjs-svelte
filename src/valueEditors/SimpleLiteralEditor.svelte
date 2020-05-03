<script>
  import * as Factory from "@rdfjs/data-model";
  let content = "";
  let lang = "";
  export let value;
  $: content = value.value;
  $: lang = value.language;
  function userChange(e) {
    value = lang
      ? Factory.literal(content, lang)
      : Factory.literal(content, "http://www.w3.org/2001/XMLSchema#string");
  }
</script>

<div>
  <input type="text" bind:value={content} on:input={userChange} />
  <input
    class="language"
    type="text"
    size="2"
    pattern="[a-z][a-z]"
    spellcheck="false"
    bind:value={lang} on:input={userChange} />
</div>
