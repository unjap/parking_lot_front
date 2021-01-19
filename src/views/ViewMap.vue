<template>
  <div class="bg-map">
    <div id="map" class="map"></div>
    <div class="pane">
      <button
        class="close"
        v-on:click="closeBtn"
        v-on:mouseover="닫기"
      >
      </button>
    </div>
  </div>
</template>

<script>
import {
  onMounted,
  reactive, ref,
} from 'vue';

export default {
  name: 'ViewMap',
  props: {
    mapInfo: Object,
  },
  setup(props, { emit }) {
    const state = reactive({
      info: ref(props.mapInfo),
    });

    console.log('state.info : ', state.info);

    const initMap = () => {
      const container = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스
      const options = {
        // 지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(state.info.latitude, state.info.longitude), // 지도의 중심좌표.
        level: 3, // 지도의 레벨(확대, 축소 정도)
      };

      const map = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴

      // 마커추가하려면 객체를 아래와 같이 하나 만든다.
      const marker = new kakao.maps.Marker({ position: map.getCenter() });
      marker.setMap(map);
    };

    const addKakaoScript = () => {
      const script = document.createElement('script');
      script.onload = () => kakao.maps.load(initMap);
      script.type = 'text/javascript';
      script.src = `http://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.VUE_APP_KAKAO_API_KEY}&autoload=false`;
      document.head.appendChild(script);
    };

    const closeBtn = () => {
      emit('isMapShow', false);
    };

    onMounted(() => {
      window.kakao && window.kakao.maps ? initMap() : addKakaoScript();
    });

    return {
      closeBtn,
    };
  },
};
</script>
<style lang="scss" scoped>
.bg-map {
  display: flex;
  position: fixed;
  top: 190px;
  left: 450px;
  width: 900px;
  height: 500px;
  background-color: rgba(0, 0, 0, 0.5);

  .map {
    width: 100%;
    height: 100%;
  }

  .pane {
    z-index: 1000;
    background: #FFF;
    position: relative;
    border-radius: 5px;

    .close {
      width: 2rem;
      height: 2rem;
      padding: 0;
      position: absolute;
      top: 1rem;
      right: 1rem;
      cursor: pointer;
      background: #0518c2dc;
    }

    .close::before,
    .close::after {
      content: '';
      width: 4px;
      height: 100%;
      background: #fff;
      display: block;
      transform: rotate(45deg) translateX(0px);
      position: absolute;
      left: 45%;
      top: 0;
    }

    .close::after {
      transform: rotate(-45deg) translateX(0px);
    }
  }
}

</style>
