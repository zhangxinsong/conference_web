<template>
    <div class="image-cover" ref="container" :style="[{width: _width, height: _height || getHeight()}]">
        <slot v-if="!image || !image.complete"></slot>
        <img v-show="image && image.complete" :src="src" @load="onLoad" @error="onError" :style="[style]"/>
    </div>
</template>
<script>
export default {
    props: {
        src: {
            type: String,
            required: true
        },
        scale: {
            type: Number,
            required: false,
            default: 16 / 9
        },
        width: [String, Number],
        height: [String, Number],
    },
    data () {
        return {
            image: null,
            style: null,
            frame: null
        }
    },
    computed: {
        _width(){
            const width = parseInt(this.width);
            if(width){
                return `${width}px`;
            }
        },
        _height(){
            const height = parseInt(this.height);
            if(height){
                return `${height}px`;
            }

            if(this.frame 
            && this.style 
            && this.frame.height 
            && this.style.height){
                return Math.min(parseInt(this.frame.height), parseInt(this.style.height)) + 'px';
            }            
        }  
    },
    components: {
		// 'FsLoading': ()=> import('app_component/common/loading/loading')
    },
    methods: {
        getHeight(){
            if(this.$refs['container']){
                const width = this.$refs['container'].clientWidth;
                if(width){
                    return `${Math.round(width/this.scale)}px`;
                }
            }
        },
        onLoad(e){
            this.image = e.target;
            let width = this.image.naturalWidth;
            let height = this.image.naturalHeight;
            let scale = width / height;

            this.frame = ((container)=> {
                return {
                    width: container.clientWidth,
                    height: container.clientWidth / this.scale,
                    scale: this.scale
                };
            })(e.target.parentElement);

            if(scale >= this.frame.scale){
                height = Math.min(this.frame.height, height);
                width = height * scale;

                this.style = {
                    height: Math.round(height) + 'px',
                    width: Math.round(width) + 'px',
                    left: Math.round((this.frame.width - width)/2) + 'px',
                };
            }else{
                width = Math.min(this.frame.width, width);
                height = width / scale;

                this.style = {
                    height: Math.round(height) + 'px',
                    width: Math.round(width) + 'px',
                    top: Math.round((this.frame.height - height)/2) + 'px',
                };
            }

            console.log(this.frame, this.style);
        },
        onError(){
        }
    }
}
</script>
<style lang="less" scoped>
    .image-cover {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        border-radius: 4px;
        img {
            transition: all ease .4s;
            position: absolute;
            width: 100%;
            height: 100%;
            max-width: auto;
        }
    }
</style>
