import CustomButton from './CustomButton.vue'
import DateRangeButton from './DateRangeButton.vue'
import PostCount from './PostCount.vue'
import Select from './Select.vue'

export default {
    install(app) {
        app.component('CustomButton', CustomButton)
        app.component('DateRangeButton', DateRangeButton)
        app.component('PostCount', PostCount)
        app.component('Select', Select)
    }
}
