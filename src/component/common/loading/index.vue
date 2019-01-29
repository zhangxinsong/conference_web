<template>
    <div class="frame">
        <template v-if="type == 0">
            <div class="spinner_0">
                <div class="rect1"></div>
                <div class="rect2"></div>
                <div class="rect3"></div>
                <div class="rect4"></div>
                <div class="rect5"></div>
            </div>
        </template>
        <template v-else-if="type == 1">
            <div class="spinner_1">
                <div class="bounce1"></div>
                <div class="bounce2"></div>
                <div class="bounce3"></div>
            </div>
        </template>
        <template v-else>
            <div class="spinner">
                <div class="spinner-container container1">
                    <div class="circle1"></div>
                    <div class="circle2"></div>
                    <div class="circle3"></div>
                    <div class="circle4"></div>
                </div>
                <div class="spinner-container container2">
                    <div class="circle1"></div>
                    <div class="circle2"></div>
                    <div class="circle3"></div>
                    <div class="circle4"></div>
                </div>
                <div class="spinner-container container3">
                    <div class="circle1"></div>
                    <div class="circle2"></div>
                    <div class="circle3"></div>
                    <div class="circle4"></div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    props: {
        type: [Number, String],
    }
}
</script>

<style lang="less" scoped>
.frame {
    text-align: center;
    position: relative;
    padding: 10px;
    margin: 0 auto;
    height: 100%;

    .spinner_0 {
        width: 50px;
        height: 20px;
        width: 50px;
        height: 20px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -10px;
        margin-left: -25px;
        & > div {
            background-color: #E14C46;
            height: 100%;
            width: 6px;
            display: inline-block;
            
            -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
            animation: stretchdelay 1.2s infinite ease-in-out;
        }
            
         .rect2 {
            -webkit-animation-delay: -1.1s;
            animation-delay: -1.1s;
        }
            
        .rect3 {
            -webkit-animation-delay: -1.0s;
            animation-delay: -1.0s;
        }
            
        .rect4 {
            -webkit-animation-delay: -0.9s;
            animation-delay: -0.9s;
        }
            
        .rect5 {
            -webkit-animation-delay: -0.8s;
            animation-delay: -0.8s;
        }
            
        @-webkit-keyframes stretchdelay {
            0%, 40%, 100% { -webkit-transform: scaleY(0.4) } 
            20% { -webkit-transform: scaleY(1.0) }
        }
            
        @keyframes stretchdelay {
            0%, 40%, 100% {
                transform: scaleY(0.4);
                -webkit-transform: scaleY(0.4);
            }  20% {
                transform: scaleY(1.0);
                -webkit-transform: scaleY(1.0);
            }
        }
    }

    .spinner_1 {
        margin: 0 auto;
        width: 40px;

        & > div {
            width: 10px;
            height: 10px;
            background-color: #E14C46;
            
            border-radius: 100%;
            display: inline-block;
            -webkit-animation: bouncedelay 1.4s infinite ease-in-out;
            animation: bouncedelay 1.4s infinite ease-in-out;
            /* Prevent first frame from flickering when animation starts */
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
        }
        
        .bounce1 {
            -webkit-animation-delay: -0.32s;
            animation-delay: -0.32s;
        }
        
        .bounce2 {
            -webkit-animation-delay: -0.16s;
            animation-delay: -0.16s;
        }
        
        @-webkit-keyframes bouncedelay {
            0%, 80%, 100% { -webkit-transform: scale(0.0) }
            40% { -webkit-transform: scale(1.0) }
        }
        
        @keyframes bouncedelay {
            0%, 80%, 100% {
                transform: scale(0.0);
                -webkit-transform: scale(0.0);
            } 40% {
                transform: scale(1.0);
                -webkit-transform: scale(1.0);
            }
        }
    }

    .spinner {
        margin: 0 auto;
        width: 20px;
        height: 20px;
        position: relative;

        .container1 > div,
        .container2 > div, 
        .container3 > div {
            width: 6px;
            height: 6px;
            background-color: #E14C46;
            
            border-radius: 100%;
            position: absolute;
            -webkit-animation: bouncedelay 1.2s infinite ease-in-out;
            animation: bouncedelay 1.2s infinite ease-in-out;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
        }
            
        .spinner-container {
            position: absolute;
            width: 100%;
            height: 100%;
        }
            
        .container2 {
            -webkit-transform: rotateZ(45deg);
            transform: rotateZ(45deg);
        }
            
        .container3 {
            -webkit-transform: rotateZ(90deg);
            transform: rotateZ(90deg);
        }
            
        .circle1 { top: 0; left: 0; }
        .circle2 { top: 0; right: 0; }
        .circle3 { right: 0; bottom: 0; }
        .circle4 { left: 0; bottom: 0; }
            
        .container2 .circle1 {
            -webkit-animation-delay: -1.1s;
            animation-delay: -1.1s;
        }
        
        .container3 .circle1 {
            -webkit-animation-delay: -1.0s;
            animation-delay: -1.0s;
        }
            
        .container1 .circle2 {
            -webkit-animation-delay: -0.9s;
            animation-delay: -0.9s;
        }
            
        .container2 .circle2 {
            -webkit-animation-delay: -0.8s;
            animation-delay: -0.8s;
        }
            
        .container3 .circle2 {
            -webkit-animation-delay: -0.7s;
            animation-delay: -0.7s;
        }
            
        .container1 .circle3 {
            -webkit-animation-delay: -0.6s;
            animation-delay: -0.6s;
        }
            
        .container2 .circle3 {
            -webkit-animation-delay: -0.5s;
            animation-delay: -0.5s;
        }
            
        .container3 .circle3 {
            -webkit-animation-delay: -0.4s;
            animation-delay: -0.4s;
        }
            
        .container1 .circle4 {
            -webkit-animation-delay: -0.3s;
            animation-delay: -0.3s;
        }
            
        .container2 .circle4 {
            -webkit-animation-delay: -0.2s;
            animation-delay: -0.2s;
        }
            
        .container3 .circle4 {
            -webkit-animation-delay: -0.1s;
            animation-delay: -0.1s;
        }
            
        @-webkit-keyframes bouncedelay {
            0%, 80%, 100% { -webkit-transform: scale(0.0) }
            40% { -webkit-transform: scale(1.0) }
        }
            
        @keyframes bouncedelay {
            0%, 80%, 100% {
                transform: scale(0.0);
                -webkit-transform: scale(0.0);
            } 40% {
                transform: scale(1.0);
                -webkit-transform: scale(1.0);
            }
        }
    }
}
</style>
