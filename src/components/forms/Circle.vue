<template>
    <div :style="{
        top: props.top,
        left: props.left,
        bottom: props.bottom,
        right: props.right
    }"></div>
</template>

<script setup>
const props = defineProps({
    top: { type: [String, null], default: null },
    left: { type: [String, null], default: null },
    bottom: { type: [String, null], default: null },
    right: { type: [String, null], default: null }
});
</script>

<style lang="scss" scoped>
div {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;

    &.move-1 {
        animation: move-1 200s linear infinite;
    }

    &.move-2 {
        animation: move-2 200s linear infinite;
    }

    @keyframes move-1 {
        0% {
            transform: translateX(0px) translateY(0px)
        }
        20% { 
            transform: translateX(400px) translateY(14px)
        }
        40% { 
            transform: translateX(250px) translateY(30px)
        }
        60% { 
            transform: translateX(-150px) translateY(-200px)
        }
        80% { 
            transform: translateX(-100px) translateY(40px)
        }
        100% { 
            transform: translateX(0) translateY(0)
        }
    }

    @keyframes move-2 {
        0% {
            transform: translateX(0px) translateY(0px)
        }
        20% { 
            transform: translateX(-400px) translateY(400px)
        }
        40% { 
            transform: translateX(-250px) translateY(200px)
        }
        60% { 
            transform: translateX(150px) translateY(120px)
        }
        80% { 
            transform: translateX(100px) translateY(-20px)
        }
        100% { 
            transform: translateX(0) translateY(0)
        }
    }

    &:before {
        border-radius: 50%;
        content: '';
        border: 2px solid rgba(51, 230, 191, .153);
        height: 600px;
        width: 600px;
        transform: translateX(-50%) translateY(-50%);
        display: block;
        position: absolute;
        top: 0;
        left: 0;
    }

    &:after {
        content: '';
        filter: blur(35px);
        background: radial-gradient(circle, rgba(4, 57, 199, .17) 0, rgba(2, 18, 42, .41) 100%);
        height: 650px;
        width: 650px;
        transform: translateX(-50%) translateY(-50%);
        display: block;
        position: absolute;
        top: 0;
        left: 0;
    }
}
</style>
