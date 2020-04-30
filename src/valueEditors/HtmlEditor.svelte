<script>
  import Factory from "@rdfjs/data-model";
  import Editor from "cl-editor/dist";
  import { onMount } from "svelte";

  let editArea;
  let editor;

  export let value;

  let content;

  $: {
    content = value.value;
    if (editor) {
      if (editor.getHtml() !== content) {
        editor.setHtml(content)
      }
    }
  }
  onMount(() => {
    editor = new Editor({
      target: editArea,
      props: {
        actions: ['b', 'i', 'u', 'strike', 'removeFormat'],
        height: 'auto',
        html: content
      }
    });
    editor.$on("change", (e) => {
      value = Factory.literal(
        editor.getHtml(),
        "http://www.w3.org/1999/02/22-rdf-syntax-ns#HTML"
      );
    });
  });
</script>

<div bind:this={editArea} />
