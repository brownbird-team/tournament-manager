<script lang="ts">
    interface Props {
        url: string;
    }
  
    let { url }: Props = $props();
</script>
  
<img src={url} alt="PFP">