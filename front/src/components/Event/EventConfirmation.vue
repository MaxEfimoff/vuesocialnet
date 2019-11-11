<template>
  <div>
    <h1 class="title m-b-sm">Please confirm entered data</h1>

    <div class="content">
      <div >
        <span class="result-title">
        Location
        </span>
        <p>{{ eventToCreate.location }}</p>
      </div>
      <div>
        <span class="result-title">
        Title
        </span>
        <p>{{ eventToCreate.title }}</p>
      </div>
      <div>
        <span class="result-title">
        Start Date
        </span>
        <p>{{ eventToCreate.startDate | formatDate }}</p>
      </div>
      <div>
        <span class="result-title">
        From
        </span>
        <p>{{ eventToCreate.timeFrom }}</p>
      </div>
      <div>
        <span class="result-title">
        To
        </span>
        <p>{{ eventToCreate.timeTo }}</p>
      </div>
      <div>
        <span class="result-title">
        Category
        </span>
        <p>{{ eventToCreate.category.name }}</p>
      </div>
      <div>
        <span class="result-title">
        Image
        </span>
        <p>{{ eventToCreate.image }}</p>
      </div>
      <div>
        <span class="result-title">
        Short Info
        </span>
        <p>{{ eventToCreate.shortInfo }}</p>
      </div>
      <div>
        <span class="result-title">
        Description
        </span>
        <p>{{ eventToCreate.description || 'Descrition not provided'}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      eventToCreate :{
        required: true,
        type: Object
      }
    },
    validations: {}
  }
</script>

<style scoped>
  .result-title {
    font-size: 16px;
    font-weight: bold;
  }
  .result-title + p {
    font-size: 14px;
  }
</style>