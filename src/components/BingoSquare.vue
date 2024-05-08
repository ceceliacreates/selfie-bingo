<template>
            <ion-card class="bingo-square" :class="{ 'is-completed': item.completed }" @click="openModal" >
              <p class="bingo-text">{{ item.text }}</p>
        </ion-card>
        <ion-modal ref="modal">
          <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button color="medium" @click="cancel">Cancel</ion-button>
        </ion-buttons>
        <ion-title>{{ item?.id }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <p>{{ item?.text }}</p>
      <ion-button color="success" @click="markComplete()">Mark Complete</ion-button>
    </ion-content>
    </ion-modal>
</template>

<script setup lang="ts">
import { IonCard, IonModal, IonHeader,IonContent, IonToolbar, IonButton, IonTitle, IonButtons } from '@ionic/vue';
import { PropType, defineProps, ref } from 'vue';
import { BingoItem } from '@/types'; 

const emit = defineEmits(['markComplete'])
  
  const props = defineProps({
    item: {
      type: Object as PropType<BingoItem>,
      default: {}
      }
});

const modal = ref();

const openModal = () => {
  if (modal.value) {
    modal.value.$el.present();
  }
};

const cancel = () => modal.value.$el.dismiss();

const markComplete = () => {

emit('markComplete', props.item.id)

modal.value.$el.dismiss();
}
</script>

<style scoped>
.bingo-square {
  width: 100%;
  height: 100%;
  margin: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bingo-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.is-completed {
  background-color: #28a745;
  color: black;
}
</style>