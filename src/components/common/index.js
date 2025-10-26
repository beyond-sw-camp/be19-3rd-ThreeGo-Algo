import MyProfileDropdown from './MyProfileDropdown.vue'
import BackButton from './BackButton.vue'
import SearchBar from './SearchBar.vue'
import TabTitle from './TabTitle.vue'
import CustomButton from './CustomButton.vue'
import DateRangeButton from './DateRangeButton.vue'
import PostCount from './PostCount.vue'
import CustomSelect from './CustomSelect.vue'
import PageInfoBanner from './PageInfoBanner.vue'
import Footer from './Footer.vue'
import Header from './Header.vue'

export {
    MyProfileDropdown,
    BackButton,
    SearchBar,
    TabTitle
}
export default {
    install(app) {
        app.component('CustomButton', CustomButton)
        app.component('DateRangeButton', DateRangeButton)
        app.component('PostCount', PostCount)
        app.component('CustomSelect', CustomSelect)
        app.component('PageInfoBanner', PageInfoBanner)
        app.component('Header', Header)
        app.component('Footer', Footer)
    }
}
