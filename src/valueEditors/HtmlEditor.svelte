<script>
  import Factory from "@rdfjs/data-model";
  import Editor from "cl-editor/src/Editor.svelte";

  export let value;

  let content;

  $: {
    if (content !== value.value) {
      content = value.value;
    }
  }

  function contentChanged(e) {
    value = Factory.literal(
      editor.getHtml(),
      "http://www.w3.org/1999/02/22-rdf-syntax-ns#HTML"
    );
  }

</script>

<Editor
  actions={['b', 'i', 'u', 'strike', 'removeFormat']}
  {content}
  height={"auto"} 
  on:change={contentChanged} />
