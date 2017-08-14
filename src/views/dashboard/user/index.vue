<template>
    <div class="dashboard-agent-container">
        <div class='title'>主页</div>
        <el-row :gutter='50'>
            <el-col :xs="12" :sm="12" :md="12" :lg="7">
                <div class="card">
                    <div class='card-top'>
                        <p>
                            <img src='../../../assets/images/kg.png' class='image'>
                        </p>
                        <span>空感一代</span>
                    </div>
                    <div class='card-bottom'>
                        <div class='card-bottom-left'>
                            <p style='color: #00CC00;' class="text1">在线</p>
                            <p class='onlineCount text2'>{{ onlineCount1 }}</p>
                        </div>
                        <div class='card-bottom-right'>
                            <p style='color: #cccccc;' class="text1">离线</p>
                            <p class='onlineCount text2'>{{ offlineCount1 }}</p>
                        </div>
                    </div>
                </div>
            </el-col>
    
            <el-col :xs="12" :sm="12" :md="12" :lg="7">
                <div class="card">
                    <div class='card-top'>
                        <p>
                            <img src='../../../assets/images/kg.png' class='image'>
                        </p>
                        <span>空感二代</span>
                    </div>
                    <div class='card-bottom'>
                        <div class='card-bottom-left'>
                            <p style='color: #00CC00;' class="text1">在线</p>
                            <p class='onlineCount text2'>{{ onlineCount2 }}</p>
                        </div>
                        <div class='card-bottom-right'>
                            <p style='color: #cccccc;' class="text1">离线</p>
                            <p class='onlineCount text2'>{{ offlineCount2 }}</p>
                        </div>
                    </div>
                </div>
    
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="10">
                <div class="card card3">
                    <div class="card3-title">
                        消息
                    </div>
                    <div class="card3-body">
                        <el-collapse @change="handleChange">
                            <el-collapse-item name="1">
                                <template slot="title">
                                    <el-badge is-dot class="item" v-if="notRead1" v-once>[系统消息]</el-badge>
                                    <span v-else>[系统消息]</span>
                                    <span style="margin-left:30px;">与现实生活一致</span>
                                </template>
                                <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                            </el-collapse-item>
                        </el-collapse>
                        <el-collapse @change="handleChange">
                            <el-collapse-item name="2">
                                <template slot="title">
                                    <el-badge is-dot class="item" v-if="notRead2" v-once>[系统消息]</el-badge>
                                    <span v-else>[系统消息]</span>
                                    <span style="margin-left:30px;">与现实生活一致</span>
                                </template>
                                <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                            </el-collapse-item>
                        </el-collapse>
                        <el-collapse @change="handleChange">
                            <el-collapse-item name="3">
                                <template slot="title">
                                    <el-badge is-dot class="item" v-if="notRead3" v-once>[系统消息]</el-badge>
                                    <span v-else>[系统消息]</span>
                                    <span style="margin-left:30px;">与现实生活一致</span>
                                </template>
                                <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                </div>
            </el-col>
        </el-row>
    
        <el-row :gutter="20" class="pictures">
            <el-col :xs="12" :sm="12" :md="6" :lg="6">
                <a href="http://www.hwlantian.com/html/detail_m1.html" target="_blank">
                    <img src="../../../assets/images/dashboard/img1.jpg">
                </a>
            </el-col>
            <el-col :xs="12" :sm="12" :md="6" :lg="6">
                <a href="http://www.hwlantian.com/html/detail_m2.html" target="_blank">
                    <img src="../../../assets/images/dashboard/img2.jpg">
                </a>
            </el-col>
            <el-col :xs="12" :sm="12" :md="6" :lg="6">
                <a href="http://www.hwlantian.com/html/detail_n1.html" target="_blank">
                    <img src="../../../assets/images/dashboard/img3.jpg">
                </a>
            </el-col>
            <el-col :xs="12" :sm="12" :md="6" :lg="6">
                <a href="http://www.hwlantian.com/html/detail_u1.html" target="_blank">
                    <img src="../../../assets/images/dashboard/img4.jpg">
                </a>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { getBaseData } from 'api/acount'
export default {
    data: () => ({
        notRead1: true,
        notRead2: true,
        notRead3: true,
        onlineCount1: 8888,
        offlineCount1: 888,
        onlineCount2: 666,
        offlineCount2: 666,
        allCount: null
    }),
    methods: {
        handleChange(val) {
            switch (val[0]) {
                case '1':
                    this.notRead1 = false;
                    break;
                case '2':
                    this.notRead2 = false;
                    break;
                case '3':
                    this.notRead3 = false;
                    break;
            }
        },
        searchDevice(ev) {
            alert(this.device_input);
        },
        showDetail: function (e) {
            console.log(e.target.innerText);
            this.$msgbox({
                title: '详情',
                message: '用户名：' + e.target.innerText,
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        instance.confirmButtonLoading = true;
                        instance.confirmButtonText = '执行中...';
                        setTimeout(() => {
                            done();
                            setTimeout(() => {
                                instance.confirmButtonLoading = false;
                            }, 300);
                        }, 3000);
                    } else {
                        done();
                    }
                }
            }).then(action => {
                this.$message({
                    type: 'info',
                    message: 'action: ' + action
                });
            });
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            console.log(`当前页: ${val}`);
        }
    },
    created() {
        getBaseData().then(res => {
            console.log(res.data)
            const tableData = res.data
            this.allCount = tableData.length
        })
    }
}
</script>

<style rel="stylesheet/scss" lang="scss">
* {
    margin: 0;
}
.clear {
  clear: both;
}
.dashboard-agent-container {
    padding: 30px 50px;
}

.title {
    font-size: 28px;
}

.el-row {
    margin-top: 50px;
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0;
    }
}

.el-col {
    border-radius: 4px;
    margin-top: 10px;
}

.card {
    width: 100%;
    height: 450px;
    border: 1px solid #d1dbe5;
    border-radius: 4px;
    background-color: #fff;
    overflow: hidden;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
}

.card-top {
    text-align: center;
    height: 350px;
    padding-bottom: 20px;
    border-bottom: 1px solid #d1dbe5;
    p {
        height: 300px;
        line-height: 300px;
        img {
            width: 90%;
            margin: 0 auto;
            vertical-align: middle;
        }
    }
    p:before {
        content: ".";
        margin-left: -5px;
        font-size: 10px;
        visibility: hidden;
    }
    span {
        height: 50px;
    }
}

.card-bottom {
    padding-top: 14px;
    margin-bottom: 4px;
}

.card-bottom-left,
.card-bottom-right {
    width: 49%;
    display: block;
    float: left;
    text-align: center;
    margin-bottom: 14px;
}

.card-bottom-left {
    border-right: 1px solid #d1dbe5;
}

.text1 {
    font-size: 20px;
}

.text2 {
    padding-top: 10px;
    font-size: 20px;
}

.card3-title {
    font-size: 24px;
    width: 90%;
    padding-top: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #d1dbe5;
    margin-left: 5%;
}

.card3-body {
    width: 90%;
    margin: 20px auto;
}

.el-collapse {
    .el-badge__content.is-fixed.is-dot {
        top: 10px;
    }
}

.pictures { 
    a {
        width: 100%;
        margin-top: 5px;

        img {
            width: 100%;
            // -webkit-transition: all .2s linear;
            // transition: all .2s linear;
            // &:hover {
            //     margin-top: -5px;
            //     -moz-box-shadow: 2px 2px 15px rgba(136, 136, 136, 0.5);
            //     -webkit-box-shadow: 2px 2px 15px rgba(136, 136, 136, 0.5);
            //     box-shadow: 2px 2px 15px rgba(136, 136, 136, 0.5);
            // }
        }
    }
}
</style>
