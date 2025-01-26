<template>
    <div class="member-page">
      <header class="header">
      <div class="center">Участники путешествия</div>
      <div class="right">
          <nav>
            <a @click="exit" class="header-a">Выйти</a>
          </nav>
        </div>
    </header>
    <OverlayComp style="background-color: rgba(0, 0, 0, 0.4)"></OverlayComp>
    <div class="main-content">
      <div class="participants-block">
        <div v-for="participant in participants" :key="participant.id" class="participant">
          <span class="member-info">{{ participant.name }}</span>
          <button class="delete" @click="confirmRemove(participant)" :disabled="!isAuthorized">удалить</button>
        </div>
      </div>
      <div class="add-block">
        <span class="main-text">Новые участникии</span>
        <button @click="addParticipant" class="add-button" :disabled="!isAuthorized">добавить</button>
        <div v-if="isModalOpen" class="modal">
          <div class="modal-main">
            <p class="main-modal-text">Пригласить участника</p>
            <input type="text" v-model="userId" id="user_id" placeholder="Id пользователя" />
            <button class="confirm" @click="confirmInviting">Пригласить</button>
            <button class="cancel" @click="cancelInviting">Отмена</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="modal">
      <div class="modal-main">
        <p class="main-modal-text">Вы точно хотите удалить участника "{{ currentParticipant.name }}"?</p>
        <button class="delete" @click="removeParticipant">Удалить</button>
        <button class="cancel" @click="closeModal">Отмена</button>
      </div>
    </div>
  </div>
</template>
  
<script>
import OverlayComp from '@/components/common/OverlayComp.vue';

export default {
  props: ["id"],
  components: {
    OverlayComp
  },
  data() {
    return {
      participants: [
        { id: 1, name: 'участник 1' },
        { id: 2, name: 'участник 2' },
        { id: 3, name: 'участник 3' },
        { id: 4, name: 'участник 4' },
        { id: 4, name: 'участник 4' },
        { id: 4, name: 'участник 4' },
        { id: 4, name: 'участник 4' },
        { id: 4, name: 'участник 4' },
        { id: 4, name: 'участник 4' },
      ],
      showModal: false,
      currentParticipant: null,
      isAuthorized: false,
      roomId: null,
      isModalOpen: false,
      userId: ''
    };
  },
  created() {
  //   const userId = localStorage.getItem('userId');
    const userId = '1';
    this.isAuthorized = userId === '1';
    this.roomId = this.id;
  },
  methods: {
    addParticipant() {
      this.isModalOpen = true;
      // const newId = this.participants.length + 1;
      // this.participants.push({ id: newId, name: `участник ${newId}` });
    },
    cancelInviting() {
      this.isModalOpen = false;
      this.userId = '';
    },
    confirmInviting() {
      this.participants.push({ id: "newId", name: `участник name` });
      this.isModalOpen = false;
    },
    confirmRemove(participant) {
      this.currentParticipant = participant;
      this.showModal = true;
    },
    removeParticipant() {
      this.participants = this.participants.filter(p => p.id !== this.currentParticipant.id);
      this.closeModal();
    },
    closeModal() {
      this.showModal = false;
      this.currentParticipant = null;
    },
    exit() {
      this.$router.push(`/route-room/${this.roomId}`);
    }
  }
};
</script>
  
<style scoped>

.member-page {
  display: flex;
  flex-direction: column;
  height: 100vh;

  background-image: url('../assets/members_background.jpeg');
  background-size: cover;
  background-position: center;
}

.header {
  display: flex;
  justify-content: space-between;
  top: 0;
  width: 100%;
  display: flex;
  padding: 10px 20px;
  background-color: rgba(33, 37, 41, 0.45);
  z-index: 2;
}

.header .left,
.header .right {
  display: flex;
  gap: 15px;
}

nav {
  display: flex;
}

.center {
  color: rgb(207, 250, 207);
  margin: 0 auto;
  text-align: center;
  font-size: 1.2rem;
  justify-content: center;
}

.header-a {
  color: rgb(207, 250, 207);
  transition: transform 0.3s ease, color 0.3s ease;
  white-space: nowrap;
  margin: 0 15px;
  font-size: 1.1rem;
  cursor: pointer;
}

.header-a:hover {
  transform: scale(1.1);
  color: rgb(155, 248, 155);
}
  
.main-content {
  position: relative;
  z-index: 2;
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.participants-block {
  /* background-color: #e0f7fa;
  padding: 15px;
  border-radius: 10px;
  width: 60%; */
  width: 40%;
  max-height: 60%; 
  /* min-height: 60vh;  */
  /* min-width: 50vh; */
  overflow-y: auto; 
  background-color: rgba(206, 231, 230, 0.3);
  border-radius: 10px;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.5);
  padding: 10px;
}

.participant {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px; 
}

.member-info {
  background-color: rgb(203, 255, 247); 
  /* margin-bottom: 10px; */
  padding: 10px;
  border-radius: 5px;
  width: 80%;
}

button {
  padding: 10px 20px;
  /* width: 100%; */
  margin: 0 5px;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  color: rgb(51, 51, 51);
  /* background-color: rgb(220, 246, 255); */
  outline: none;
}

.delete {
  background-color: rgb(247, 192, 192);
}

.delete:hover {
  background-color: rgb(247, 148, 148);
}

.cancel {
  background-color: rgb(252, 247, 175);
}

.cancel:hover {
  background-color: rgb(253, 245, 136);
}

.confirm {
  background-color: rgb(207, 250, 207);
}

.confirm:hover {
  background-color: rgb(162, 248, 162);
}

.add-button {
  background-color: rgb(207, 250, 207);
  padding: 15px 30px;
}

.add-button:hover {
  background-color: rgb(162, 248, 162);
}

button:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  /* background-color: rgb(173, 226, 255); */
  color: rgb(51, 51, 51);
}

button:disabled {
  /* background-color: #cccccc; */
  cursor: not-allowed;
}

.add-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 30%;
  margin-left: 10%;
  min-height: 20vh; 
  background-color: rgba(206, 231, 230, 0.3);
  border-radius: 10px;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.5);
}

.main-text {
  font-size: 1.3rem;
  color: rgb(207, 250, 207);
  text-align: center;
  /* margin-top: 10px; */
}


.modal {
  position: fixed;
  top: 0;
  left: 0;
  /* right: 0;
  bottom: 0; */
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-main {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 80%; 
  text-align: center;
  /* min-width: 500px;  */
  /* width: 100%;  */
}

.main-modal-text {
	font-size: 1.5rem;
	/* color: rgb(55, 55, 55); */
	text-align: center;
	margin-bottom: 25px;
	z-index: 2;
}

input {
  display: block;
  width: 100%;
  min-width: 40vh;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
}
</style>