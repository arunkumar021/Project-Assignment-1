<template>
  <div class="container">
      <h2 class="text-center mt-5">Dashboard</h2>
     
      <!--Input-->
      <div class="d-flex">
          <input v-model="task" type="text" placeholder="Enter Task" class="form-control">
          <button @click="submitTask" class="btn btn-warning rounded-0">Submit</button>
      </div>
    
      <table class="table table-bordered mt-5">
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
</template>

<script>
export default {
  data() {
      return{
          task: '',
          editedTask: null,
          tasks: [
              {
                  name: 'Add Task',
                  status: 'to-do'
              }
          ],
          availableStatus: ['To-Do' , 'Finished']
      }
  },
  methods: {
      submitTask() {
          if(this.task.length === 0) return;
          
          if(this.editedTask === null) {
          this.tasks.push({
              name: this.task,
              status: 'todo'
          });
          this.task = ''
          }else{
              this.tasks[this.editedTask].name = this.task
              this.editedTask = null;
          }
      },
      deleteTask(index) {
          this.tasks.splice(index , 1);
      },
      editTask(index) {
          this.task = this.tasks[index].name
          this.editedTask = index;
      },
       changeStatus(index) {
      let newIndex = this.availableStatus.indexOf(this.tasks[index].status);
      if(++newIndex > 1) {
      newIndex = 0;
      }
      this.tasks[index].status = this.availableStatus[newIndex];
  },
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
</style>>

