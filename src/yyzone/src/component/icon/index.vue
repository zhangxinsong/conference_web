<template>
    <i :class="`yy-icon yy-icon-${type}`"></i>
</template>
<script>
export default {
    props: {
        type: {
            type: String
        }
    }
}
</script>
