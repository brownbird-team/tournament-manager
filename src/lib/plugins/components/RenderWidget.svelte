<script lang="ts" generics="W extends WidgetRegistryConfig">
    import type { WidgetRegistryConfig, WidgetRenderable } from "../widget";

    interface Props {
        widget: WidgetRenderable<W>;
    }

    const { widget }: Props = $props();
</script>

<widget.component {...widget.props} />