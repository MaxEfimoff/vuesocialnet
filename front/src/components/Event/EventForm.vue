<template>
  <section class="posts section">
    <div class="post-new-form">
      <h2 class="padding">Event Form</h2>
      <div>{{ currentStep }} of {{ formSteps.length }}</div>
      <keep-alive>
        <!-- We are rendering child components dinamically-->
        <component
          :is="currentComponent"
          @stepUpdated="mergeStepData"
          ref="currentComponent"
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
          :disabled="!canProceed"
          v-if="currentStep !== formSteps.length"
          class="leftmargin"
          @click="moveToNextStep">Next</button>
        <button
          v-else
          class="leftmargin">Confirm</button>
      </div>
      <!-- Just To See Data in the Form -->
      <pre><code>{{ formData }}</code></pre>
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
        canProceed: false,
        formSteps: [
          'EventLocation',
          'EventDetail',
          'EventDescription',
          'EventConfirmation'
        ],
        formData: {
          location: null,
          title: null,
          startDate: null,
          category: null,
          image: null,
          shortInfo: null,
          description: null,
          timeFrom: null,
          timeTo: null,
        }
      }
    },
    computed: {
      currentProgress() {
        return (100 / this.formSteps.length * this.currentStep);
      },
      // Define component we want to render
      currentComponent() {
        return this.formSteps[this.currentStep - 1];
      }
    },
    methods: {
      moveToNextStep() {
        this.currentStep++;
        // Defer the callback to be executed after the next DOM update cycle
        this.$nextTick(() => {
          // We are checking if the child component is invalid
          // And then assigning value (true or false) to canProceed
          this.canProceed = !this.$refs['currentComponent'].$v.$invalid;
        })
      },
      moveToPreviousStep() {
        this.currentStep--;
        this.canProceed = true;
      },
      mergeStepData(step) {
        this.formData = {...this.formData, ...step.data}
        this.canProceed = step.isValid
      }
    }
  }
</script>

<style>

</style>