import MyProfileDropdown from './MyProfileDropdown.vue'
import BackButton from './BackButton.vue'
import SearchBar from './SearchBar.vue'
import TabTitle from './TabTitle.vue'

import CustomButton from './CustomButton.vue'
import DateRangeButton from './DateRangeButton.vue'
import PostCount from './PostCount.vue'
import Select from './Select.vue'

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
        app.component('Select', Select)
    }
}
