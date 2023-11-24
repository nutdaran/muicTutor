<script>
    // import { ref, computed, onMounted } from 'vue;
    // import { RouterLink } from 'vue-router';

    import CourseCard  from '@/components/CourseCard.vue'
    export default {
        components: {
            CourseCard
        },
        data:() => ({
            primaryCourse: 'PCSA',
            tutor: {
                "name": 'Ped',
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
                alert("Added Course");
            },
            leaveCourse(courseId) {
                const updatedCourse = this.courses.find(course => course.courseID === courseId);
                updatedCourse.enrolled-=1;
                updatedCourse.studentList.pop(); //need to remove that username
                alert("Removed Course");
            },
            checkCourseName(courseName) {
                return courseName == this.primaryCourse;
            }
        },
    }
</script>

<template>
    <main>
        <div class="course">
            <h2>Course</h2>
            <h1>{{ primaryCourse }}</h1>
        </div>
        <div class="d-flex flex-wrap ga-7" id="card"> 
            <!--Add v-show conidtion -> should be replaced with firebase query-->
            <CourseCard
            v-for="course in courses" 
            v-show="checkCourseName(course.courseName)" 
            :key="course.courseID" 
            :course="course" 
            @addStudent="enrollCourse"
            @removeStudent="leaveCourse"
            />
        </div>
    </main>
</template>

<style>
    #card {
            padding-top: 1rem;
            justify-content:flex-start;
            align-content: center;
        }
</style>