<script>
  // import observeElement from '../plugins/intersectionObserver.js'
  
  export default {
    props: {
      data: {
        type: Array,
        required: true,
      },
    },
      
    data() {
      return {
        options: {
          theme: "light2",
          animationEnabled: true,
          title:{
            text: "Cost by Courses"
          },
          data: this.data
        },
        styleOptions: {
          width: "100%",
          height: "360px"
        },
        // visible: false, // Flag for animation visibility
      }
    },

    // mounted() {
    //   observeElement(this.$el, () => {
    //     this.visible = true;
    //   });
    // },
  }
</script>

<template>
  <!-- <div v-if="visible"> -->
    <CanvasJSChart :options="options" :data="$data" :styles="styleOptions"/>
  <!-- </div> -->
</template>                              