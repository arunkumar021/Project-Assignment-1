<template>
    <div class="container  mb-2 bg-light text-dark">
      <h2 class="text-center mt-5 text-danger">
        <span class="border-bottom my-2 border-primary">
           Dashboard
           </span>
       </h2>

     <div class="d-flex justify-content-center my-5" @click="loadData">
       <button class="btn btn-primary ">
       Show ToDos
     </button> 
    </div> 

      <!--Input-->
      <div class="d-flex">
          <input v-model="task" type="text" placeholder="Enter Task" class="form-control">
          <button @click="submitTask" class="btn btn-warning rounded-0 mx-2">Submit</button>  
      </div>
      <div class="d1 my-3  d-flex ">
      <table class="table table-bordered  mt-5 mb-5">
  <thead>
    <tr class="text-center">
      <th scope="col">Task</th>
      <th scope="col">Status</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
    </thead>
    <tbody>
      <tr  class="text-center" v-for="(task , index) in tasks" :key="index">
        <td scope="row"><span :class="{'finished': task.status === 'Finished'}">{{task.name}}</span></td>
        <td style="width:120px"><span  @click="changeStatus(index)" class="pointer">{{task.status}}</span></td>
        <td>
            <div  class="text-center" @click="editTask(index)">
                <span class="fa fa-pen"></span>
            </div>
        </td>
        <td>
        <div  class="text-center" @click="deleteTask(index)">
          <span class="fa fa-trash"></span>
        </div>
      </td>
    </tr>
  </tbody>
</table>
</div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
      return {
          task: '',
          editedTask: null,
          tasks: [],
          availableStatus: ['To-Do' , 'Finished'],
          id:this.$route.params.id
      }
  },
  methods: {
        async submitTask() {
          if(this.task.length === 0) return;
          if(this.editedTask === null) {
          this.tasks.push({
              name: this.task,
              status: 'ToDo/Finished'
          });
         let result = await axios.patch("http://localhost:3000/submit/" + this.id , {tasks: this.tasks} )
          this.task = ''
          console.log(result);
          }else {
              this.tasks[this.editedTask].name = this.task
              this.editedTask = null;
             await axios.patch("http://localhost:3000/submit/" + this.id , {tasks: this.tasks} );
          }
        //  console.log(result);
          },

      async deleteTask(index) {
        this.tasks.splice(index , 1);
        await axios.patch("http://localhost:3000/delete/" + this.id , {ind: index} )
          },

      editTask(index) {
        this.task = this.tasks[index].name;
        this.editedTask = index;
        },  
      
      async changeStatus(index) {
        let newIndex = this.availableStatus.indexOf(this.tasks[index].status);
        if(++newIndex > 1) {
        newIndex = 0;
      }
        this.tasks[index].status = this.availableStatus[newIndex];
        await axios.patch("http://localhost:3000/changeStatus/" + this.id , {status: this.tasks[index].status , index:newIndex})
      },

      async loadData() {
        let id = this.$route.params.id;
      let result = await axios.get("http://localhost:3000/" + id);
      console.log(result);
      this.tasks = result.data.tasks;
      console.log(this.tasks)
      }
      },
      }
</script>

  <style scoped>
      .pointer {
          cursor: pointer;
      }
      .finished {
          text-decoration: line-through;
      }
      img{
          height: 200px;
      }
      .fa fa-pen {
          cursor: pointer;
      }
      .table{
        margin-bottom: 10px;
      }
  </style>>

