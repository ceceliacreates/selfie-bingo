<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { BingoItem } from '@/types'; 
import { ref, provide } from 'vue'
import { Preferences } from '@capacitor/preferences';


//TODO take/upload photo to mark complete

//TODO display photo as bingo square instead of text

// TODO update reset game to also clear photos

//TODO add instructions

//TODO add real prompts

//TODO check for bingo wins

//TODO add undo markComplete

const items = [
  'Mollit commodo incididunt labore proident consectetur eu ea anim adipisicing minim ex.',
 'Ullamco cillum eiusmod id reprehenderit tempor laboris commodo et aute excepteur eu.', 
 'Culpa est incididunt qui eu duis.', 
 'Veniam cillum tempor id laboris.', 
 'Adipisicing mollit nostrud enim dolore ut.',
  'Eiusmod velit ut nostrud nulla deserunt proident anim nostrud exercitation voluptate qui officia occaecat culpa.', 
  'Sint reprehenderit duis et officia laboris ullamco.', 
  'Non reprehenderit aliqua id commodo ex nisi reprehenderit eiusmod veniam eu.', 
  'Aliqua Lorem fugiat deserunt exercitation esse nostrud in duis magna incididunt in tempor.', 
  'Eu Lorem Lorem veniam nisi excepteur duis laborum voluptate sit.',
  'Eiusmod minim veniam aliquip laborum voluptate.', 
  'Velit exercitation labore pariatur pariatur sit mollit reprehenderit ut do irure voluptate.', 
  'Consectetur occaecat duis eiusmod sunt eiusmod laborum culpa excepteur consequat cillum duis.', 
  'Reprehenderit deserunt et veniam fugiat fugiat non deserunt ut fugiat elit ullamco veniam excepteur do.', 
  'Occaecat Lorem commodo pariatur quis ex non Lorem veniam ut consectetur magna consequat occaecat cupidatat.',
  'Aliquip deserunt aliquip commodo tempor elit.', 
];

const winningCombos = [
  [1,2,3,4],
  [5,6,7,8],
  [9,10,11,12],
  [13,14,15,16],
  [1,5,9,13],
  [2,6,10,14],
  [3,7,11,15],
  [4,8,12,16],
  [1,6,11,16],
  [4,7,10,13]
]

const shuffle = (array: string[])  => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const bingoItems = ref<BingoItem[]>([])

const loadBingoItems = async () => {
  let bingoItemsString = ''

  // loads bingoItems from local/device storage if exists

    const result = await Preferences.get({ key: 'bingoItems'})

    bingoItemsString = result.value || '';

   if (bingoItemsString) {
 
    // sets ref based on local/device storage if exists
    bingoItems.value = JSON.parse(bingoItemsString)

   } else {
    let shuffledItems = shuffle([...items]);
    // sets ref to shuffled items with no items complete
    bingoItems.value = shuffledItems.map((item, index) => ({
  id: index + 1, // Assigning a unique ID based on the shuffled index
  text: item,
  completed: false
}))

  // then saves newly created items to local/device storage
  saveBingoItems(JSON.stringify(bingoItems.value))
   }
}

const saveBingoItems = async (bingoItemsString: string) => {

    await Preferences.set({
      key: 'bingoItems',
      value: bingoItemsString
    })

}

const markComplete = (id: number) => {
 const item = bingoItems.value.find(item => item.id === id)

 if (item) {
  item.completed = true;
 }

 const bingoItemsString = JSON.stringify(bingoItems.value)

 saveBingoItems(bingoItemsString)
}

const clearBingoItems = async () => {

await Preferences.clear()
loadBingoItems()

}

// loads bingo Items on initialization
loadBingoItems()

provide('bingoItems', {
  bingoItems, loadBingoItems, saveBingoItems, markComplete, clearBingoItems
})
</script>
