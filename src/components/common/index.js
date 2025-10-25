import CustomButton from './CustomButton.vue'
import PageInfoBanner from './PageInfoBanner.vue'
export default {
    install(app) {
        app.component('CustomButton', CustomButton)
        app.component('PageInfoBanner', PageInfoBanner)
    }
}
