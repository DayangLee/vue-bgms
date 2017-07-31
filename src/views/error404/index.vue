 <template>
  <div class="container">
    <div class="box1">
      <img src="../../assets/images/404/404.jpg">
    </div>
    <div class="box2">
      <img src="../../assets/images/404/喔字样.png">
    </div>
    <div class="box3">
      <img src="../../assets/images/404/smile.png">
      <span class="text1">页面被拿走的原因可能有： 网络信号差&nbsp; | &nbsp;找不到请求页面&nbsp; | &nbsp;输入的网址不正确</span>
      <br>
      <span class="text2">NETWORK SIGNAL &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;REQUEST NOT BE FOUND &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;THE URL IS INCORRECT</span>
    </div>
    <div class="box4">
      <button class="button button1">
        <!-- <img src="../../assets/images/404/shuaxin.png"> -->
         <img src="../../assets/images/404/shuaxin_icon.png"> 
         <span>刷新</span>
      </button>
      <button class="button button2">
        <!-- <img src="../../assets/images/404/fanhuishouye.png"> -->
        <img src="../../assets/images/404/fanhuishouye_icon.png"> 返回首页
      </button>
    </div>
  </div>
</template>
 
 <script>
export default {

}
</script>
 
 <style rel="stylesheet/scss" lang="scss" scoped>
.box1 {
  width: 100%;
  height: 300px;
  text-align: center;
  margin-top: 100px;
  img {
    width: 500px;
  }
}

.box2 {
  width: 100%;
  text-align: center;
}

.box3 {
  width: 700px;
  margin: 10px auto;
  img {
    width: 30px;
  }
  .text1 {
    font-family: 微软雅黑;
    font-size: 18px;
    color: #797982;
  }
  .text2 {
    font-size: 9.5px;
    color: #797982;
    padding-left: 252px;
  }
}

.box4 {
  width: 450px;
  margin: 40px auto;
}

.button {
  font-family: 微软雅黑;
  font-size: 25px;
  color: white;
  width: 120px;
  height: 40px;
  background-color: rgba(255, 187, 28, 1);
  border-radius: 15px;
  outline: none;
  &:hover {
    background-color: rgba(255, 187, 28, .8);
    cursor: pointer;
  }
  &:focus {
    border: none;
  }
  img {
    width: 30px;
    margin-top: 5px;
  }
  span {
    width: 80px;
  }
}

input[type="button"],
 ::-webkit-file-upload-button,
button {
  align-items: flex-start;
  text-align: center;
  cursor: default;
  color: buttontext;
  border-width: 0;
  border-style: none;
  border-color: rgba(0, 0, 0, 0);
}

button::-moz-focus-inner,
input::-moz-focus-inner {
  border-width: 0;
  border-style: none;
  border-color: rgba(0, 0, 0, 0);
}
</style>
 