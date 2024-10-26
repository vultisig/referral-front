<template>
    <div id="pixi-box"></div>
</template>

<script setup>
import { Application, Assets, Sprite  } from 'pixi.js';
import { onBeforeMount, onMounted, reactive } from 'vue';
import { mapMutations } from '@/map-state';

const emit = defineEmits(['ready']);
const {
    setPixiRedeem,
    setEnableBG,
    setDisableBG,
    setEnableRecursionLogo,
    setDisableRecursionLogo
} = mapMutations();

const data = reactive({
    recursionLogoApp: null,
    bgApp: null,
    redeemApp: null,

    bgTextures: [
        {
            code: 'logo',
            url: `/img/bg/logo.svg`,
            width: 43,
            height: 41
        }, {
            code: 'back-logo',
            url: `/img/bg/back-logo.svg`,
            width: 57,
            height: 56
        }
    ],
    redeemTextures: [
        {
            code: 'logo',
            url: `/img/bg/logo.svg`,
            width: 43,
            height: 41
        }
    ],
    recursionLogoTextures: [
        {
            code: 'logo',
            url: `/img/logo-light.svg`,
            width: 86,
            height: 82
        }
    ],

    bgItems: [],
    redeemItems: [],
    recursionLogoItems: []
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

const addRedeemTexture = async ({ item, x, y }) => {
    const payload = {
        sprite: new Sprite(item.texture)
    }

    data.redeemApp.stage.addChild(payload.sprite);
    payload.sprite.anchor.set(0.5);

    const scale = (.1 + Math.random() * .6);

    if (item.width) {
        payload.sprite.width = parseInt(item.width * scale);
    }

    if (item.height) {
        payload.sprite.height = parseInt(item.height * scale);
    }

    payload.sprite.x = x || parseInt(.5 * data.redeemApp.screen.width);
    payload.sprite.y = y || parseInt(.5 * data.redeemApp.screen.height);

    payload.dir = {
        x: +(((Math.random() > .4 ? 1 : -1) * (Math.random() * 8)).toFixed(1)),
        y: +(((Math.random() > .3 ? -1 : 1) * (Math.random() * 8)).toFixed(1))
    };

    payload.rotate = Math.random() / 4;

    data.redeemItems.push(payload);
};

const addRecursionLogoTexture = async ({ item, scale }) => {
    const payload = {
        sprite: new Sprite(item.texture)
    }

    data.recursionLogoApp.stage.addChild(payload.sprite);
    payload.sprite.anchor.set(0.5);

    if (item.width) {
        payload.sprite.width = parseInt(item.width * scale);
    }

    if (item.height) {
        payload.sprite.height = parseInt(item.height * scale);
    }

    payload.sprite.x = parseInt(.5 * data.recursionLogoApp.screen.width);
    payload.sprite.y = parseInt(.5 * data.recursionLogoApp.screen.height);

    data.recursionLogoItems.push(payload);
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

const pixiRedeem = async ({ x, y }) => {
    if (!data.redeemApp) {
        await createRedeem();
    }

    data.redeemTextures.forEach(item => {
        if (item.code === 'logo') {
            for (let i = 0; i < 140; i++) {
                addRedeemTexture({ item, x, y });
            }
        }
    });
}

const destroyRedeem = async () => {
    if (data.redeemApp) {
        data.redeemApp.canvas.style.display = 'none';
        data.redeemApp.canvas.remove();

        setTimeout(() => {
            data.redeemApp.destroy();
            data.redeemApp = null;
            document.getElementById('pixi-redeem').remove();
        }, 10);
    }
}

const createRedeem = async () => {
    const div = document.createElement('div');
    div.id = 'pixi-redeem';
    document.getElementById('pixi-box').appendChild(div);

    data.redeemApp = new Application();

    await data.redeemApp.init({ backgroundAlpha: 0, resizeTo: window });

    document.getElementById('pixi-redeem').appendChild(data.redeemApp.canvas);

    data.redeemApp.ticker.add((time) => {
        data.redeemItems.forEach((item, id) => {
            item.sprite.x += item.dir.x;
            item.sprite.y += item.dir.y;

            let exit = false;

            if (item.sprite.x > data.redeemApp.screen.width + 30) {
                exit = true;
            }

            if (item.sprite.x <= -30) {
                exit = true;
            }

            if (item.sprite.y >= data.redeemApp.screen.height + 30) {
                exit = true;
            }

            if (item.sprite.y <= -30) {
                exit = true;
            }

            item.sprite.rotation += item.rotate * time.deltaTime;

            if (exit) {
                data.redeemApp.stage.removeChild(item.sprite);
                data.redeemItems.splice(id, 1);
            }

            if (!data.redeemItems.length) {
                destroyRedeem();
            }
        });
    });
}

const enableRecursionLogo = async () => {
    if (!data.recursionLogoApp) {
        await createRecursionLogo();
    }

    data.recursionLogoTextures.forEach(item => {
        if (item.code === 'logo') {
            for (let scale = 4; scale < 22; scale += 1) {
                addRecursionLogoTexture({ item, scale });
            }
        }
    });
}

const destroyRecursionLogo = async () => {
    if (data.recursionLogoApp) {
        data.recursionLogoApp.canvas.style.display = 'none';
        data.recursionLogoApp.canvas.remove();

        setTimeout(() => {
            data.recursionLogoApp.destroy();
            data.recursionLogoApp = null;
            document.getElementById('pixi-recursion-logo').remove();
        }, 10);
    }
}

const createRecursionLogo = async () => {
    const div = document.createElement('div');
    div.id = 'pixi-recursion-logo';
    document.getElementById('pixi-box').appendChild(div);

    data.recursionLogoApp = new Application();

    await data.recursionLogoApp.init({ backgroundAlpha: 0, resizeTo: window });

    document.getElementById('pixi-recursion-logo').appendChild(data.recursionLogoApp.canvas);
}

onMounted(async () => {
    // Preload bg
    await Promise.all(data.bgTextures.map(async (item) => {
        item.texture = await Assets.load(item.url);
    }));

    // Preload redeems
    await Promise.all(data.redeemTextures.map(async (item) => {
        item.texture = await Assets.load(item.url);
    }));

    // Preload recursion
    await Promise.all(data.recursionLogoTextures.map(async (item) => {
        item.texture = await Assets.load(item.url);
    }));

    // Create bg
    enableBG();

    // Create fn in store
    setPixiRedeem(pixiRedeem);
    setEnableBG(enableBG);
    setDisableBG(disableBG);

    setEnableRecursionLogo(enableRecursionLogo);
    setDisableRecursionLogo(destroyRecursionLogo);

    emit('ready');
});

onBeforeMount(async () => {
    await destroyRedeem();
    await disableBG();
});
</script>

<style lang="scss">
    #pixi-recursion-logo,
    #pixi-redeem,
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

    #pixi-recursion-logo {
        opacity: .4;
        filter: brightness(0.5);
        animation: recoursion-scale linear infinite 40s;
    }

    @keyframes recoursion-scale {
        0% {
            transform: scale(1);
            opacity: .4;
        }
        50% {
            transform: scale(2);
            opacity: 0;
        }
        100% {
            transform: scale(1);
            opacity: .4;
        }
    }

    #pixi-redeem {
        opacity: 1;
        filter: none;
    }
</style>
