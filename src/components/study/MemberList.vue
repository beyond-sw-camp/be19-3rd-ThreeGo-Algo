<template>
  <div 
    class="member-list-item" 
    :class="{ selected: selected }"
    @click="$emit('click')"
  >
    <div class="col col-checkbox">
      <input
        type="radio"
        name="selectedMember"
        :checked="selected"
        @click.stop="$emit('click')"
      />
    </div>
    
    <div class="col col-no">
      <span class="member-no">{{ displayNo }}</span>
    </div>
    
    <div class="col col-nickname">
      <MiniProfile 
        :nickname="nickname" 
        :rankName="rankName" 
      />
    </div>
    
    <div class="col col-rank">
      <span class="member-rank">{{ rankName }}</span>
    </div>
    
    <div class="col col-role">
      <StudyRole :variant="role" />
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed, defineEmits } from 'vue'
import StudyRole from './StudyRole.vue'
import MiniProfile from '../common/MiniProfile.vue'

const props = defineProps({
  no: {
    type: Number,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  rankName: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    validator: (value) => ['member', 'leader', 'invalid'].includes(value)
  },
  selected: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])

const displayNo = computed(() => props.no)
</script>

<style scoped>
.member-list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px 20px;
  border-bottom: 1px solid #EFEFEF;
  box-sizing: border-box;
  cursor: pointer;
  transition: background-color 0.2s;
}

.member-list-item:hover {
  background: #f0faff;
}

.member-list-item.selected {
  background: #e6f6ff;
  border-left: 4px solid #0aa2eb;
}

.col {
  display: flex;
  align-items: center;
}

.col-checkbox {
  width: 60px;
  justify-content: center;
}

.col-no {
  width: 80px;
  justify-content: center;
}

.col-nickname {
  flex: 1;
  margin-left: 100px;
  justify-content: flex-start;
}

.col-rank {
  width: 150px;
  justify-content: center;
  margin-right: 40px;
}

.col-role {
  width: 150px;
  justify-content: center;
}

.col-checkbox input[type="radio"] {
  accent-color: #007bff;
  width: 16px;
  height: 16px;
  cursor: pointer;
  margin: 0;
}

.member-no {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.member-rank {
  font-size: 14px;
  color: #383838;
}
</style>