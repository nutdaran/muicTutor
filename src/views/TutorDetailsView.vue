<script>
    import CourseCard  from '@/components/CourseCard.vue'
    import { onMounted } from 'vue';

    export default {
        components: {
            CourseCard
        },
        data:() => ({
            tutor: { 
                name: 'Ped',
                id: '001',
                bio:'Major: ICCS\nsawasdee ka dek dek',
                contact: {
                    ig:'https://www.instagram.com/ten_upon_t/?utm_source=ig_web_button_share_sheet&igshid=OGQ5ZDc2ODk2ZA==',
                    fb:'https://www.instagram.com/ten_upon_t/?utm_source=ig_web_button_share_sheet&igshid=OGQ5ZDc2ODk2ZA=='
                }
            },
            courses: [
            {
                courseID: '001',
                courseName: 'Web Application',
                tutor: "Ped",
                tutorID: '001',
                time: "Tue 7pm-8pm",
                rate: 200,
                capacity: 10,
                enrolled: 3,
                studentList:['A','B','C']
                },
                {
                courseID: '002',
                courseName: 'Scalable',
                tutor: "Ped",
                tutorID: '001',
                time: "Tue 1pm-3pm",
                rate: 400,
                capacity: 10,
                enrolled: 5,
                studentList:['A','B','C','D','E']
                },
                {
                courseID: '003',
                courseName: 'PCSA',
                tutor: "Ped",
                tutorID: '001',
                time: "Wed 2pm-4pm",
                rate: 300,
                capacity: 10,
                enrolled: 3,
                studentList:['A','B','C']
                },
                {
                courseID: '004',
                courseName: 'PCSA',
                tutor: "Ped",
                tutorID: '001',
                time: "Wed 2pm-4pm",
                rate: 300,
                capacity: 10,
                enrolled: 10,
                studentList:['A','B','C']
                },
                {
                courseID: '005',
                courseName: 'PCSA',
                tutor: "Ped",
                tutorID: '001',
                time: "Wed 2pm-4pm",
                rate: 300,
                capacity: 10,
                enrolled: 3,
                studentList:['A','B','C']
                },
                {
                courseID: '003',
                courseName: 'PCSA',
                tutor: "Nong Phone",
                tutorID: '002',
                time: "Wed 2pm-4pm",
                rate: 300,
                capacity: 10,
                enrolled: 3,
                studentList:['A','B','C']
                },
                {
                courseID: '006',
                courseName: 'PCSA',
                tutor: "Ped",
                tutorID: '001',
                time: "Wed 2pm-4pm",
                rate: 300,
                capacity: 10,
                enrolled: 3,
                studentList:['A','B','C']
                },
                {
                courseID: '007',
                courseName: 'PCSA',
                tutor: "Ped",
                tutorID: '001',
                time: "Wed 2pm-4pm",
                rate: 300,
                capacity: 10,
                enrolled: 9,
                studentList:['A','B','C']
                },
            ]
        }),
        methods: {
            enrollCourse(courseId) {
                const updatedCourse = this.courses.find(course => course.courseID === courseId);
                updatedCourse.studentList.push("F");
                updatedCourse.enrolled+=1;
                console.log("update list: ",updatedCourse.studentList)
                alert("Added Course");
            },
            leaveCourse(courseId) {
                const updatedCourse = this.courses.find(course => course.courseID === courseId);
                updatedCourse.enrolled-=1;
                updatedCourse.studentList.pop(); //need to remove that username
                console.log("update list: ", updatedCourse.studentList)
                alert("Removed Course");
            },
        },
        computed: {
            formattedBio() {
                return this.tutor.bio.replace(/\n/g, '<br>');
            }
        },
        setup() {
            onMounted(() => {
  window.scrollTo(0, 0)
})
        }
}

</script>

<template>
    <main>
        <h2>Tutor Info</h2>
        <div class="bio">
            <div>
                <v-img
                :width="200"
                aspect-ratio="1/1"
                src="/src/assets/tutorProfilePictures/t1.jpg"
                ></v-img>
            </div>
            <div style="padding-left: 2rem;">
                <h1>{{ tutor.name }}</h1>
                <div id="section">
                    <p id="head"><strong>Bio</strong></p>
                    <p v-html="formattedBio"></p>
                </div>
                <p id="head"><strong>Contact</strong></p>
                <div style="display:flex">
                    <div v-show="tutor.contact.ig!=''"><a :href="tutor.contact.ig"><v-icon icon="mdi-instagram"></v-icon></a></div>
                    <div v-show="tutor.contact.fb!=''"><a :href="tutor.contact.fb"><v-icon icon="mdi-facebook"></v-icon></a></div>
                </div>
            </div>
        </div>
        <h2>List of Courses</h2> 
        <div class="d-flex flex-wrap ga-7" id="card"> 
            <!--Add v-show conidtion -> should be replaced with firebase query-->
            <CourseCard 
            v-for="course in courses" 
            v-show="course.tutor==tutor.name" 
            :key="course.courseID" 
            :course="course" 
            @addStudent="enrollCourse"
            @removeStudent="leaveCourse"
            />
        </div>
    </main>
</template>

<style>
    .bio {
        display: flex;
        justify-content:flex-start;
        align-items: center;
        padding-bottom: 2rem;
        margin-top: 1rem;
    }
    #head {
        font-size: 20px;
    }
    #section{
        padding-bottom: 0.5rem;
    }
    #card {
        padding-top: 1rem;
        justify-content:flex-start;
        align-content: center;
    }
</style>
