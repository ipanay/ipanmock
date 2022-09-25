<template>
  <div class="project-detail-box">
    <Alert :alertArr="alertArr"></Alert>
    <div class="leftbox">
      <label for="">
        <input class="proitemsearch" v-model="searchkey" type="search">
        <i class="prosearch"></i>
      </label>
      <div>
        <a-tree
          showIcon
          :treeData="roleTree"
          :selectedKeys="selectedArr"
          :expandedKeys.sync="addOpenArr"
          :draggable="true"
          @drop="onDrop"
          @select="handleClick">
          <!-- <a-icon slot="team" type="team" /> -->
        </a-tree>
      </div>
    </div>
      <div class="rightbox">
        <a-form
          :form="form"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          >
          <a-form-item label="项目名称">
            <a-input
              v-decorator="['name', { rules: [{ required: true, message: 'Please input your projectName!' }] }]"
            />
          </a-form-item>
          <a-form-item label="项目描述">
            <a-textarea
              v-decorator="['description']"
            />
          </a-form-item>
        </a-form>
        <a-table :columns="[]" :dataSource="[]" bordered>
          <template slot="name" slot-scope="text">
            <a>{{ text }}</a>
          </template>
        </a-table>
      </div>
      <div class="options">
        <a-button shape="circle" @click="gohome" title="回家">H</a-button>
        <a-button shape="circle" icon="redo" @click="applyData" title="刷新"></a-button>
        <a-button shape="circle" icon="plus" @click="handleAddRoot" title="添加根组织"></a-button>
        <a-button shape="circle" icon="plus-square" @click="handleAddSon" title="添加子组织"></a-button>
        <a-button shape="circle" icon="delete" @click="delData" title="删除节点"></a-button>
        <a-button shape="circle" icon="save" @click="saveData" title="保存数据"></a-button>

      </div>
  </div>
</template>
<script>
import { saveproject, getproItem } from '../../api/project'
import Alert from '../alert/main.vue'
const originalDataMap = new Map()
export default {
  components: {
    Alert
  },
  data () {
    return {
      alertArr: [],
      projectId: '',
      userId: '',
      form: this.$form.createForm(this),
      searchkey: '',
      polylineArr: [],
      roleTree: [],
      selectedArr: [],
      addOpenArr: [],
      originalDataArr: [],
      originalDataMap: originalDataMap,
      newChildNode: {
        key: '#',
        title: '新增角色',
        name: '新增角色',
        shortName: '新增角色',
        parentId: '',
        children: []
      }
    }
  },
  created () {
    if (this.$route.params && this.$route.params.projectId) {
      getproItem({ projectId: this.$route.params.projectId }).then(res => {
        const data = res.data
        this.form.setFieldsValue({
          name: data.name,
          description: data.description
        })
        this.projectId = data.projectId
      })
    }
    const storage = window.localStorage
    if (storage.getItem('user') && JSON.parse(storage.getItem('user')).id) {
      this.userId = JSON.parse(storage.getItem('user')).id
    }
    this.applyData()
  },
  methods: {
    applyData () {
      this.currentNode = {}
      originalDataMap.clear()
      this.roleTree = []
      this.selectedArr = []
      this.addOpenArr = []
      const data = [
        // {"id":"c4b88924-e01e-4940-9284-ca99666c0678","name":"公路站人员","parentId":null,"title":"公路站人员"},
        // {"id":"4eebd9f0-d91a-433d-bffb-6f2fc914fadb","name":"养护股人员","parentId":"c4b88924-e01e-4940-9284-ca99666c0678"},
        // {"id":"a2eccf2c-c81f-4a4b-b9dc-6aeaa7617e0c","name":"路政股人员","parentId":"c4b88924-e01e-4940-9284-ca99666c0678"}
      ]
      this.originalDataArr = data
      this.roleTree = [...this.formatData(data)]
    },
    handleClick ([nodeKey]) {
      if (!nodeKey) {
        return false
      }
      ;[...this.selectedArr] = [nodeKey]
      this.currentNode = originalDataMap.get(nodeKey)
      if (this.currentNode.key === '#') {
        this.mainid = ''
      } else {
        this.mainid = this.currentNode.id
      }
    },
    formatData (treedata) { // 格式化树结构
      var rootList = []
      if (treedata.length) {
        treedata.forEach((orgObj, i) => {
          orgObj.key = orgObj.id
          orgObj.title = orgObj.name
          orgObj.children = []
          originalDataMap.set(orgObj.key, orgObj)
          if (!orgObj.parentId) {
            rootList.push(orgObj)
          }
        })
        this.originalDataMap = originalDataMap
        this.originalDataMap.size && this.originalDataMap.forEach((orgObj, key) => {
          if (orgObj.parentId) {
            var rootNode = this.originalDataMap.get(orgObj.parentId)
            rootNode.children.push(orgObj)
          }
        })
      }
      return rootList
    },
    handleAddRoot () {
      if (this.isHasNewNode()) {
        return
      }
      this.roleTree.push(this.newChildNode)
      this.addNewNode()
    },
    handleAddSon () {
      if (this.isHasNewNode()) {
        return
      }
      if (!this.currentNode.key) {
        alert('请先选择一个根节点')
        return
      }
      this.addOpenArr.push(this.currentNode.key)
      var parentNode = originalDataMap.get(this.currentNode.key)
      this.newChildNode.parentId = parentNode.id
      this.newChildNode.typeId = parentNode.typeId
      this.addNewNode()
      parentNode.children.push(this.newChildNode)
    },
    isHasNewNode () {
      if (this.originalDataMap.get('#')) {
        alert('请先处理已存在新节点！')
        this.handleClick(['#'])
        return true
      }
    },
    addNewNode () {
      this.mainid = ''
      this.originalDataMap.set('#', this.newChildNode)
      this.currentNode = this.newChildNode
      this.selectedArr = [this.currentNode.key]
    },
    saveData () {
      this.form.validateFields((err, val) => {
        if (err) {
          alert('tianxie')
        } else {
          val.userId = this.userId
          val.projectId = this.projectId
          saveproject(val).then(res => {
            console.log(res)
            if (res.result === 'success') {
              const project = res.project
              this.projectId = project.id
              this.alertArr.push({ msg: '保存成功', tag: this.alertArr.length })
            }
          })
        }
      })
    },
    delData (maindata) {
      if (this.currentNode.key !== '#') {
          this.removeNode()
      } else {
        this.removeNode()
      }
    },
    removeNode (isToFirst, isDel) {
      if (this.currentNode.parentId) { // 删除非根节点
        var parentNode = originalDataMap.get(this.currentNode.parentId)
        parentNode && parentNode.children.filter((child, i) => {
          if (child.key === this.currentNode.key) {
            parentNode.children.splice(i, 1)
            this.originalDataMap.delete(this.currentNode.key)
          }
        })
      } else { // 删除根节点
        this.originalDataMap.delete(this.currentNode.key)
        this.roleTree.filter((ele, i) => {
          if (ele.key === this.currentNode.key) {
            this.roleTree.splice(i, 1)
            return true
          }
        })
      }
      isDel && this.originalDataMap.delete(this.currentNode.key)
      this.roleTree.length && this.handleClick([this.roleTree[0].key])
    },
    onDrop (info) {
        var saveparms = {}
        const newParentKey = info.node.eventKey
        const currentNodeKey = info.dragNode.eventKey
        const dropPos = info.node.pos.split('-')
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])
        this.currentNode = this.originalDataMap.get(currentNodeKey)
        const newParentNode = this.originalDataMap.get(newParentKey)
        var oldParentNode = this.currentNode.parentId && this.originalDataMap.get(this.currentNode.parentId)
        if (this.currentNode.key === '#' || newParentNode.key === '#') { // 未保存的职务节点
            this.$notification['warning']({
            message: '新增角色不能立即调整顺序，请先保存！'
            })
            return
        }
        if (!info.dropToGap) { // 移动到其他父节点
            if (newParentNode.typeId !== oldParentNode.typeId) {
            this.$notification['warning']({
                message: '不能将不同类型的角色置于目标角色下，请选择相同类型的角色！'
            })
            return
            }
            if (oldParentNode) { // 移动非根节点
            this.changePosition(oldParentNode.children, newParentNode)
            } else { // 移动根节点
            this.changePosition(this.roleTree, newParentNode)
            }
            this.currentNode.parentId = newParentNode.id
            saveparms.id = this.currentNode.id
            saveparms.oParentId = oldParentNode.id
            saveparms.nParentId = this.currentNode.parentId
            saveparms.position = newParentNode.children.length
        } else if ((info.node.children || []).length > 0 && info.node.expanded && dropPosition === 1) {
            return false
        } else { // 兄弟节点上方或下方
            var newParent = {}
            var newAr = []
            if (!newParentNode.parentId) { // 移动到根节点位置
            newParent = this.roleTree
            newAr = newParent
            } else {
            newParent = this.originalDataMap.get(newParentNode.parentId)
            newAr = newParent.children
            }
            let newIndex = (newAr || []).findIndex(item => item === newParentNode)
            var oldAr = []
            if (!oldParentNode) { // 移动根节点
            oldParentNode = this.roleTree
            oldAr = this.roleTree
            } else {
            oldAr = oldParentNode.children
            }
            const oldIndex = (oldAr || []).findIndex(item => item === this.currentNode)
            if (newParent.typeId !== oldParentNode.typeId) {
            this.$notification['warning']({
                message: '不能将不同类型的角色置于目标角色下，请选择相同类型的角色！'
            })
            return
            }
            if (dropPosition === -1) { // 移到同级目标节点上面
            oldAr.splice(oldIndex, 1)
            newAr.splice(newIndex, 0, this.currentNode)
            } else { // 移到同级目标节点下面
            if (oldIndex < newIndex) {
                newAr.splice(newIndex + 1, 0, this.currentNode)
                oldAr.splice(oldIndex, 1)
            } else {
                oldAr.splice(oldIndex, 1)
                newAr.splice(newIndex + 1, 0, this.currentNode)
            }
            newIndex = newIndex + 1
            }
            saveparms.id = this.currentNode.id
            saveparms.oParentId = oldParentNode.id
            saveparms.nParentId = newParent.id
            saveparms.position = newIndex
        }
        this.selectedArr = [this.currentNode.key]
        move(saveparms).then(res => {
            this.$notification[res.result]({
            message: '移动结果',
            description: res.info
            })
            if (res.result !== 'success') {
            this.applyData()
            }
        })
    },
    gohome () {
      this.$router.push({name:'home'});
    }
  },
  watch: {
    searchkey (val) {
      this.originalDataArr.filter(item => {
        if (item.title === this.searchkey) {
          this.selectedArr.push(item.key)
        }
      })
    }
  }
}
</script>
<style scoped>

</style>