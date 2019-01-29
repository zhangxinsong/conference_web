<template>
    <div class="yy-loading" :class="`yy-loading-${size}`">
        <div class="yy-rotate">
            <div class="yy-rotate-icon">
                <slot>
                    <span class="yy-rotate-icon-default" :class="`yy-loading-${type}`"></span>
                </slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Loading',
    props: {
        size: {
            type: String,
            default: 'small'
        },
        type: {
            type: String,
            default: 'primary'
        }
    }
}
</script>
