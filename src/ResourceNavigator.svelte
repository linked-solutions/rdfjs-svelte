<script>
import { createEventDispatcher } from 'svelte';
import SubjExpand from './images/SubjExpand.svelte';
import ObjExpand from './images/ObjExpand.svelte';
const dispatch = createEventDispatcher();
export let resource;
function setSubject() {
    dispatch("subject", resource);
}
function setObject() {
    dispatch("object", resource);
}

</script>

<style>
div {
  display: flex;
  flex-shrink: 0;
}
button {
  margin-left: .4em;
}
</style>

<div>
    <button class="icon" on:click={setSubject}>
        <SubjExpand size="1em"/>
    </button>
    <button class="icon" on:click={setObject}>
        <ObjExpand size="1em"/>
    </button>
</div>