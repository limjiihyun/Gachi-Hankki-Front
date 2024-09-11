// 게시물 작성 시간이 몇 시간, 며칠 전인지 계산하는 함수
export function timeSince(postDate) {
  const now = new Date(); // 현재 시간
  const postTime = new Date(postDate); // 게시물 작성 시간

  const timeDiff = now - postTime; // 시간 차이 (밀리초 단위)
  const minutes = Math.floor(timeDiff / (1000 * 60)); // 분 단위로 변환
  const hours = Math.floor(timeDiff / (1000 * 60 * 60)); // 시간 단위로 변환
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // 일 단위로 변환

  if (days > 0) {
    // 24시간이 넘으면 일 단위로 표시
    return `${days}일 전`;
  } else if (hours > 0) {
    // 1시간 이상 24시간 미만이면 시간 단위로 표시
    return `${hours}시간 전`;
  } else {
    // 1시간 미만이면 분 단위로 표시
    return `${minutes}분 전`;
  }
}
