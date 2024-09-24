<template>
    <div id="pixi-box"></div>
</template>

<script setup>
import { Application, Assets, Sprite  } from 'pixi.js';
import { onBeforeMount, onMounted, reactive } from 'vue';
import { mapMutations } from '@/map-state';

const emit = defineEmits(['ready']);
const { setEnableBG, setDisableBG } = mapMutations();

const data = reactive({
    bgApp: null,
    bgTextures: [
        {
            code: 'logo',
            url: `${import.meta.env.VITE_APP_BASE_URL}/img/bg/logo.svg`,
            width: 43,
            height: 41
        }, {
            code: 'back-logo',
            url: `${import.meta.env.VITE_APP_BASE_URL}/img/bg/back-logo.svg`,
            width: 57,
            height: 56
        }
    ],
    bgItems: []
});

const addBgTexture = async (item) => {
    const payload = {
        sprite: new Sprite(item.texture)
    };

    data.bgApp.stage.addChild(payload.sprite);
    payload.sprite.anchor.set(0.5);

    const scale = (.5 + Math.random() * 1);

    if (item.width) {
        payload.sprite.width = parseInt(item.width * scale);
    }

    if (item.height) {
        payload.sprite.height = parseInt(item.height * scale);
    }

    payload.sprite.x = parseInt(Math.random() * data.bgApp.screen.width);
    payload.sprite.y = parseInt(Math.random() * data.bgApp.screen.height);

    payload.dir = {
        x: +(((Math.random() > .4 ? 1 : -1) * (Math.random() + .2)).toFixed(1)),
        y: +(((Math.random() > .4 ? 1 : -1) * (Math.random() + .2)).toFixed(1))
    };

    payload.rotate = Math.random() / 20;

    data.bgItems.push(payload);
};

const enableBG = async () => {
    if (!data.bgApp) {
        await createBG();
    }
    data.bgTextures.forEach(item => {
        addBgTexture(item);   
        addBgTexture(item);   

        if (item.code === 'logo') {
            for (let i = 0; i < 3; i++) {
                addBgTexture(item);
            }
        }

        if (item.code === 'back-logo') {
            addBgTexture(item);
        }
    });
};

const disableBG = async () => {
    if (data.bgApp) {
        data.bgApp.canvas.style.display = 'none';
        data.bgApp.canvas.remove();

        setTimeout(() => {
            data.bgApp.destroy();
            data.bgApp = null;
            document.getElementById('pixi-bg').remove();
        }, 10);
    }
};

const createBG = async () => {
    const div = document.createElement('div');
    div.id = 'pixi-bg';
    document.getElementById('pixi-box').appendChild(div);

    data.bgApp = new Application();

    await data.bgApp.init({ backgroundAlpha: 0, resizeTo: window });

    if (!document.getElementById('pixi-bg')) {
        return;
    }

    document.getElementById('pixi-bg').appendChild(data.bgApp.canvas);

    data.bgApp.ticker.add((time) => {
        // Work with bg un peux
        data.bgItems.forEach(item => {
            item.sprite.x += item.dir.x;
            item.sprite.y += item.dir.y;

            if (item.sprite.x >= data.bgApp.screen.width) {
                item.dir.x *= -1;
            }

            if (item.sprite.x <= 0) {
                item.dir.x *= -1;
            }

            if (item.sprite.y >= data.bgApp.screen.height) {
                item.dir.y *= -1;
            }

            if (item.sprite.y <= 0) {
                item.dir.y *= -1;
            }

            item.sprite.rotation += item.rotate * time.deltaTime;
        });
    });
};

onMounted(async () => {
    // Preload bg
    await Promise.all(data.bgTextures.map(async (item) => {
        item.texture = await Assets.load(item.url);
    }));

    // Create bg
    enableBG();

    // Create fn in store
    setEnableBG(enableBG);
    setDisableBG(disableBG);

    emit('ready');
});

onBeforeMount(async () => {
    await disableBG();
});
</script>

<style lang="scss">
    #pixi-bg {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        pointer-events: none;
        opacity: .8;
        filter: blur(8px);
    }
</style>
