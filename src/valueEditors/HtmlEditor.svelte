<script>
  import Factory from "@rdfjs/data-model";
  import Editor from "cl-editor/src/Editor.svelte";

  export let value;

  let content;

  let editor;

  $: {
    if (content !== value.value) {
      content = value.value;
      if (editor) {
        editor.setHtml(content);
      }
    }
  }

  function contentChanged(e) {
    content = editor.getHtml()
    value = Factory.literal(
      editor.getHtml(),
      "http://www.w3.org/1999/02/22-rdf-syntax-ns#HTML"
    );
  }

</script>
<Editor bind:this={editor}
  actions={['b', 'i', 'u', 'strike', 'removeFormat']}
  html={content}
  height={"auto"} 
  on:change={contentChanged} />
