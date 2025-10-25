<script setup>
const handleLike = () => alert('좋아요!')
</script>

<template>
    <div class="button-demo">
        <h2>🎨 CustomButton 전체 예시</h2>

        <!-- 기본 스타일 -->
        <div class="section">
            <h3>기본 버튼</h3>
            <CustomButton>기본</CustomButton>
            <CustomButton variant="secondary">secondary</CustomButton>
            <CustomButton variant="gray1">gray1</CustomButton>
            <CustomButton variant="gray2">gray2</CustomButton>
            <CustomButton variant="danger">danger</CustomButton>
            <CustomButton variant="admin">admin</CustomButton>
        </div>

        <!-- 높이(Height) 조절 -->
        <div class="section">
            <h3>크기(Height)</h3>
            <CustomButton height="sm">Small (32px)</CustomButton>
            <CustomButton height="md">Medium (40px)</CustomButton>
            <CustomButton height="lg">Large (46px)</CustomButton>
        </div>

        <!-- 아이콘 -->
        <div class="section">
            <h3>아이콘 버튼</h3>
            <CustomButton icon="/src/assets/icons/thumbup.svg" @click="handleLike('좋아요 버튼 클릭')">
                좋아요
            </CustomButton>

            <CustomButton icon="/src/assets/icons/plus.svg" iconSize="14">
                게시물 작성하기
            </CustomButton>
        </div>

        <!-- 비활성 -->
        <div class="section">
            <h3>비활성 버튼</h3>
            <CustomButton disabled>기본 비활성</CustomButton>
            <CustomButton variant="secondary" disabled>보조 비활성</CustomButton>
            <CustomButton variant="danger" disabled>위험 비활성</CustomButton>
        </div>

        <!-- 너비(width) 조절 -->
        <div class="section">
            <h3>너비 (Width)</h3>
            <CustomButton width="200px">200px 버튼</CustomButton>
            <CustomButton width="100%">100% 전체 버튼</CustomButton>
        </div>
    </div>
</template>

<style scoped>
.button-demo {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-top: 20px;
    padding: 30px;
    background: #fafafa;
    border-radius: 12px;
    border: 1px solid #e5e5e5;
    font-family: 'Noto Sans KR';
}

.section {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
}

h2 {
    font-size: 20px;
    font-weight: 700;
    color: #333;
    margin-bottom: 10px;
}

h3 {
    font-size: 16px;
    font-weight: 600;
    color: #555;
    width: 100%;
    margin-bottom: 6px;
}
</style>