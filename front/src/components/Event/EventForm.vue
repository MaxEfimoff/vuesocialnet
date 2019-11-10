<template>
  <section class="posts section">
    <div class="post-new-form">
      <h2 class="padding">Event Form</h2>
      <div>{{ currentStep }} of {{ allStepsCount }}</div>
      <keep-alive>
        <EventLocation
          v-if="currentStep === 1"
          @stepUpdated="mergeStepData"/>
        <EventDetail
          v-if="currentStep === 2"
          @stepUpdated="mergeStepData"/>
        <EventDescription
          v-if="currentStep === 3"
          @stepUpdated="mergeStepData"/>
        <EventConfirmation
          v-if="currentStep === 4"
          :eventToCreate="formData"/>
      </keep-alive>
      <progress
        :value="currentProgress"
        max="100">{{ currentProgress }}%</progress>
      <div>
        <button
          v-if="currentStep !== 1"
          @click="moveToPreviousStep">Back</button>
        <button
          v-if="currentStep !== allStepsCount"
          class="leftmargin"
          @click="moveToNextStep">Next</button>
        <button
          v-else
          class="leftmargin">Confirm</button>
      </div>
      <!-- Just To See Data in the Form -->
      <!-- <pre><code>{{ formData }}</code></pre> -->
    </div>
  </section>
</template>

<script>
  import EventLocation from './EventLocation';
  import EventDetail from './EventDetail';
  import EventDescription from './EventDescription';
  import EventConfirmation from './EventConfirmation';

  export default {
    components: {
      EventLocation,
      EventDetail,
      EventDescription,
      EventConfirmation
    },
    data () {
      return {
        currentStep: 1,
        allStepsCount: 4,
        formData: {
          location: null,
          title: null,
          startDate: null,
          category: null,
          image: null,
          shortInfo: null,
          description: null,
          timeTo: null,
          timeFrom: null
        }
      }
    },
    computed: {
      currentProgress() {
        return (100 / this.allStepsCount * this.currentStep);
      }
    },
    methods: {
      moveToNextStep() {
        this.currentStep++;
      },
      moveToPreviousStep() {
        this.currentStep--;
      },
      mergeStepData(stepData) {
        this.formData = {...this.formData, ...stepData}
      }
    }
  }
</script>

<style>

</style>