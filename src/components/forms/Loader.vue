<template>
    <ul>
        <li><Icon icon="loader"/></li>
        <li><Icon icon="loader-1"/></li>
        <li><Icon icon="loader-2"/></li>
        <li><Icon icon="loader-3"/></li>
    </ul>
</template>

<style lang="scss" scoped>
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        background: $black;

        &:after {
            position: absolute;

            background-image: linear-gradient(222deg, var(--Color-primary-black-0) 17px, transparent 18px), linear-gradient(45deg, var(--Color-primary-black-1) 17px, transparent 18px);
            background-size: 50px 50px;
            background-repeat: repeat;

            content: "";
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            animation: vulti-loader infinite 20s;
        }

        @keyframes vulti-loader {
            0% {
                background-position-x: 0%;
                background-position-y: 0%;
            }
            100% { 
                background-position-x: 100%;
                background-position-y: 100%;
            }
        }

        li {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2;
            animation: svg 24s infinite;
            svg {
                width: 120px;
                height: auto;
                fill: none;
            }

            &:nth-child(1) {
                svg {
                    animation: base-svg 4s infinite;
                }
            }
            &:nth-child(2) {
                svg {
                    animation: line-1-svg 4s infinite;
                }
            }
            &:nth-child(3) {
                svg {
                    animation: line-2-svg 4s infinite;
                }
            }
            &:nth-child(4) {
                svg {
                    animation: line-3-svg 4s infinite;
                }
            }
        }

        &.light {
            &:after {
                background-image: linear-gradient(222deg, var(--Color-primary-black-0) 37px, transparent 38px), linear-gradient(145deg, var(--Color-primary-black-1) 37px, transparent 38px);
                animation: vulti-loader infinite 4s;
            }

            li {
                svg {
                    width: 60px;
                }
            }
        }
    }

    @keyframes base-svg {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        50% {
            transform: scale(1.1);
            opacity: .8;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }

    @keyframes line-1-svg {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        50% {
            transform: scale(1.6);
            opacity: .6;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }

    @keyframes line-2-svg {
        0% {
            transform: scale(1);
            opacity: .8;
        }
        50% {
            transform: scale(2);
            opacity: .4;
        }
        100% {
            transform: scale(1);
            opacity: .8;
        }
    }

    @keyframes line-3-svg {
        0% {
            transform: scale(1);
            opacity: .6;
        }
        50% {
            transform: scale(2.4);
            opacity: .2;
        }
        100% {
            transform: scale(1);
            opacity: .6;
        }
    }

    @keyframes svg {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>












