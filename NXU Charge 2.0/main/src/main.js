import 'mdui/mdui.css';
import 'mdui';

import { setColorScheme } from 'mdui/functions/setColorScheme';
import { setTheme } from 'mdui/functions/setTheme';
setColorScheme('#006874');

import '@mdui/icons/dark-mode';
import '@mdui/icons/light-mode';
import '@mdui/icons/dark-mode--outlined';
import '@mdui/icons/light-mode--outlined';

import { createApp, ref, watch, reactive } from 'vue'
import {
    ConfigProvider, 
    NavBar,
    Tab,
    Tabs,
    Collapse,
    CollapseItem,
    Tag,
    Cell,
    CellGroup,
    Image as VanImage,
    Lazyload,
} from 'vant';
import 'vant/lib/index.css';

import "@/assets/css/main.css";
import head_w from '@/assets/img/head-w.jpg'


function lightToDark() {
    lightToDarkVar.value = !lightToDarkVar.value;
    if (lightToDarkVar.value) {
        lightToDarkContent.value = "light";
        setTheme('light');
        localStorage.setItem("theme", true);
    } else {
        lightToDarkContent.value = "dark";
        setTheme('dark');
        localStorage.setItem("theme", false);
    }
}

function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}

const lightToDarkVar = ref(true);
const lightToDarkContent = ref("light");
if (!window.matchMedia || !window.matchMedia('(prefers-color-scheme: dark)') || !window.matchMedia('(prefers-color-scheme: dark)').addEventListener) {
    if (localStorage.getItem('isDark') == "true") {
        lightToDarkVar.value = false;
    } else {
        lightToDarkVar.value = true;
    }
} else {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        lightToDarkVar.value = false;
    } else {
        lightToDarkVar.value = true;
    }
}
if (localStorage.getItem("theme") != null) {
    lightToDarkVar.value = localStorage.getItem("theme") == "true";
}
if (lightToDarkVar.value) {
    lightToDarkContent.value = "light";
    setTheme("light")
} else {
    lightToDarkContent.value = "dark";
    setTheme("dark")
}
// lightToDark()

const navbar = createApp({
    setup() {
        const onClickLeft = () => {
            // location.href = document.referrer;
            location.href = "http://" + location.host + '/charge/'
        };
        const onClickRight = () => {
            window.open('https://github.com/this-is-h/nxu-charge', '_blank')
        };
        return {
            onClickLeft,
            onClickRight
        };
    },
});
navbar.use(NavBar);
navbar.mount('#navbar');

const app = createApp({
    setup() {
        return {
            lightToDarkContent
        }
    }
});
app.use(ConfigProvider);
app.mount('#config-provider');

const main = createApp({
    setup() {
        const active = ref("about");
        var option = getQueryVariable("type");
        if (["about","qa","update", "thanks"].includes(option)){
            active.value = option;
        }
        const qaActiveName = ref([]);
        const updateActiveName = ref('14');
        return {
            active,
            qaActiveName,
            updateActiveName,
            head_w,
        };
    },
});
main.use(Tab);
main.use(Tabs);
main.use(Collapse);
main.use(CollapseItem);
main.use(Tag);
main.use(Cell);
main.use(CellGroup);
main.use(VanImage);
main.use(Lazyload);
main.mount("#main");

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => { 
    if (event.matches) {
        lightToDarkVar.value = false;
    } else {
        lightToDarkVar.value = true;
    }
    if (lightToDarkVar.value) {
        lightToDarkContent.value = "light";
        setTheme('light');
        localStorage.setItem("theme", true)
    } else {
        lightToDarkContent.value = "dark";
        setTheme('dark');
        localStorage.setItem("theme", false)
    }
});
