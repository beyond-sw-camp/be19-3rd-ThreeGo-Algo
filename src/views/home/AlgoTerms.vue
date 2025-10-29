<!-- src/pages/AlgoTerms.vue -->
<template>
    <div class="terms-privacy-page">
        <!-- 헤더 -->
        <header>
            <div class="container">
                <h1>Algo 이용약관 및 개인정보처리방침</h1>
            </div>
        </header>

        <!-- 메인 컨테이너 -->
        <main class="container">
            <!-- 네비게이션 -->
            <el-card class="card" shadow="hover">
                <div class="toc">
                    <el-link href="#terms" type="primary">이용약관 (Terms of Service)</el-link>
                    <el-link href="#privacy" type="primary">개인정보처리방침 (Privacy Policy)</el-link>
                </div>
            </el-card>

            <!-- 이용약관 -->
            <el-card id="terms" class="card" shadow="hover">
                <h2>Algo 이용약관</h2>
                <el-scrollbar height="300px">
                    <div class="scrollable">
                        <p>
                            이 약관은 "Algo"(이하 "회사")가 제공하는 코딩풀이 및 학습 플랫폼(이하 "서비스")의 이용과 관련된 사항을 규정합니다.
                        </p>

                        <h4>제1조 (목적)</h4>
                        <p>이 약관은 회사와 회원 간에 서비스 이용에 관한 권리·의무 및 책임사항을 규정함을 목적으로 합니다.</p>

                        <h4>제2조 (정의)</h4>
                        <dl>
                            <dt>1. 회원</dt>
                            <dd>본 약관에 동의하고 회사와 서비스 이용계약을 체결한 자</dd>
                            <dt>2. 아이디(ID)</dt>
                            <dd>회원 식별과 서비스 이용을 위해 회원이 설정한 문자 또는 이메일 주소</dd>
                            <dt>3. 콘텐츠</dt>
                            <dd>회원이 서비스 내에 작성하거나 게시한 코드, 풀이, 댓글 등</dd>
                        </dl>

                        <h4>제3조 (약관의 효력 및 변경)</h4>
                        <p>
                            본 약관은 서비스 초기 화면 또는 별도 연결화면에 게시함으로써 효력을 발생합니다. 회사는 관련 법령을 준수하여 약관을 개정할 수 있으며, 개정 시 시행일 및 사유를
                            명시하여 최소 7일 전 공지합니다.
                        </p>

                        <h4>제4조 (회원가입 및 관리)</h4>
                        <p>
                            회원은 회사가 정한 절차에 따라 회원가입을 신청하며, 가입 시 이메일·이름 등 필수정보를 정확히 제공해야 합니다. 허위 정보 기재 시 서비스 이용에 제한이 있을 수
                            있습니다. 회원은 언제든지 탈퇴를 요청할 수 있으며, 회사는 지체 없이 처리합니다.
                        </p>

                        <h4>제5조 (서비스의 제공 및 변경)</h4>
                        <p>회사는 코딩 문제 풀이, 학습 통계, 커뮤니티 등 서비스를 제공합니다. 서비스 내용은 사정에 따라 변경될 수 있으며, 변경 시 사전 공지를 합니다.</p>

                        <h4>제6조 (회원의 의무)</h4>
                        <p>회원은 타인의 개인정보 도용, 허위정보 등록, 불법 프로그램 업로드, 타인의 저작권 침해 등 불법·부당한 행위를 해서는 안 됩니다.</p>

                        <h4>제7조 (게시물의 관리 및 저작권)</h4>
                        <p>
                            회원이 작성한 게시물의 저작권은 해당 회원에게 귀속됩니다. 단, 회사는 서비스 운영 및 홍보 목적으로 비상업적 범위 내에서 게시물을 이용할 수 있습니다. 불법 또는
                            부적절한 게시물은 사전 통보 없이 삭제될 수 있습니다.
                        </p>

                        <h4>제8조 (회원 탈퇴 및 계약 해지)</h4>
                        <p>
                            회원은 언제든지 탈퇴를 요청할 수 있으며, 탈퇴 시 회사는 관련 법령에 따른 보존 의무를 제외하고 회원 정보를 즉시 삭제합니다. 탈퇴 후 작성한 게시물은 삭제되지
                            않으며, 사전에 직접 삭제해야 합니다.
                        </p>

                        <h4>제9조 (개인정보 보호)</h4>
                        <p>회사는 개인정보 보호 관련 법령을 준수하며, 개인정보 처리에 관한 사항은 개인정보처리방침에 따릅니다.</p>

                        <h4>제10조 (서비스 이용제한)</h4>
                        <p>회원이 본 약관 또는 법령을 위반한 경우 회사는 경고, 일시 정지, 이용계약 해지 등 조치를 취할 수 있습니다.</p>

                        <h4>제11조 (면책조항)</h4>
                        <p>
                            회사는 천재지변, 서비스 제공자의 고의·과실이 없는 장애 등에 대해 책임을 지지 않습니다. 또한 회원의 계정 관리 소홀로 발생한 손해에 대해서는 회사가 책임지지
                            않습니다.
                        </p>

                        <h4>제12조 (준거법 및 관할)</h4>
                        <p>본 약관은 대한민국 법령을 따르며, 분쟁 발생 시 회사 본사 소재지 관할법원을 제1심 관할법원으로 합니다.</p>
                    </div>
                </el-scrollbar>
            </el-card>

            <!-- 개인정보처리방침 -->
            <el-card id="privacy" class="card" shadow="hover">
                <h2>Algo 개인정보처리방침</h2>
                <el-scrollbar height="300px">
                    <div class="scrollable">
                        <p>시행일: 2025-10-24</p>

                        <h4>제1조 (총칙)</h4>
                        <p>회사(Algo)는 개인정보보호법 및 관련 법령을 준수하며 회원 개인정보의 안전한 처리를 위해 노력합니다.</p>

                        <h4>제2조 (수집하는 개인정보 항목 및 수집방법)</h4>
                        <dl>
                            <dt>수집 항목(회원가입 시)</dt>
                            <dd>- 필수: 이메일, 이름, 비밀번호(암호화 저장)</dd>
                            <dd>- 선택: 프로필 이미지, 소셜 계정 정보</dd>
                            <dt>수집방법</dt>
                            <dd>회원가입 양식, 서비스 이용 과정에서의 자동수집(쿠키, 접속로그 등)</dd>
                        </dl>

                        <h4>제3조 (개인정보의 이용 목적)</h4>
                        <p>
                            회원 식별 및 서비스 제공, 문제 풀이 기록 보관 및 통계 제공, 공지사항 전달, 고객문의 응대, 부정 이용 방지 및 보안 강화 등에 이용합니다.
                        </p>

                        <h4>제4조 (보유 및 이용기간)</h4>
                        <p>회원 탈퇴 시 지체 없이 파기합니다. 다만 법령에 의한 보관 의무가 있는 경우에는 아래와 같이 보관합니다.</p>
                        <ul>
                            <li>계약 또는 청약철회 관련 기록: 5년</li>
                            <li>소비자 불만·분쟁 처리 기록: 3년</li>
                        </ul>

                        <h4>제5조 (개인정보의 제3자 제공)</h4>
                        <p>원칙적으로 제3자 제공을 하지 않습니다. 다만 이용자의 동의가 있거나 법령에 근거가 있는 경우 예외로 합니다.</p>

                        <h4>제6조 (개인정보 처리 위탁)</h4>
                        <p>원활한 서비스 제공을 위해 아래 업무를 외부에 위탁할 수 있습니다.</p>
                        <ul>
                            <li>이메일 발송 대행: Amazon Web Services (AWS SES) 또는 Google SMTP</li>
                            <li>파일 저장: AWS S3</li>
                        </ul>


                        <h4>제7조 (정보주체의 권리·의무 및 행사방법)</h4>
                        <p>정보주체인 회원은 개인정보 열람·정정·삭제·처리정지 요구 권리를 가집니다. 관련 요청은 고객센터 또는 team.threego@gmail.com으로 할 수 있습니다.
                        </p>

                        <h4>제8조 (개인정보의 파기절차 및 방법)</h4>
                        <p>전자적 파일 형태의 개인정보는 복구 불가능한 방법으로 삭제하며, 출력물은 분쇄·소각합니다.</p>

                        <h4>제9조 (쿠키의 사용)</h4>
                        <p>쿠키는 서비스 제공과 이용편의 및 통계분석을 위해 사용됩니다. 브라우저 설정을 통해 쿠키 수집을 거부할 수 있습니다.</p>

                        <h4>제10조 (개인정보의 국외 이전)</h4>
                        <p>
                            회사는 클라우드 서비스(AWS 등)를 이용하여 데이터를 국외 서버(미국 등)에 저장할 수 있습니다. 이 경우 개인정보보호법 등 관련 법령에 따라 안전성 확보조치를
                            시행합니다.
                        </p>

                        <h4>제11조 (개인정보의 안전성 확보조치)</h4>
                        <ul>
                            <li>비밀번호 등 주요 정보의 암호화 저장</li>
                            <li>접근권한의 최소화 및 접근통제 시스템 운영</li>
                            <li>보안 프로그램 설치 및 주기적 점검</li>
                            <li>정기적 백업 및 복구 시스템 운영</li>
                        </ul>

                        <h4>제12조 (개인정보 보호책임자)</h4>
                        <p>- 책임자: 개인정보보호 담당자<br />- 이메일: team.threego@gmail.com<br />- 문의처: 고객센터 내 문의하기
                        </p>

                        <h4>제13조 (정책 변경)</h4>
                        <p>본 방침 변경 시 시행일자를 명시하여 최소 7일 전 공지합니다.</p>

                        <h4>제14조 (AI 피드백 기능 운영)</h4>
                        <p>
                            회사는 회원이 요청한 코딩 풀이 피드백 기능을 제공하기 위해 자체 FastAPI 서버를 운영합니다.
                            이 과정에서 회원이 제출한 코드 및 관련 데이터가 일시적으로 처리될 수 있습니다.
                            회사는 해당 데이터를 피드백 제공 외 다른 목적으로 이용하지 않으며, 일정 기간 경과 후 즉시 삭제합니다.
                        </p>
                        <p>
                            FastAPI 서버는 필요 시 외부 인공지능 API(OpenAI API 등)에 코드를 전달할 수 있으며,
                            이 경우 개인정보를 포함하지 않는 비식별 데이터만 사용됩니다.
                        </p>

                    </div>
                </el-scrollbar>
            </el-card>

            <!-- 푸터 -->
            <el-card class="card" shadow="never">
                <footer>
                    <p>© 2025 Algo. All rights reserved. 문의: team.threego@gmail.com</p>
                </footer>
            </el-card>

            <!-- 맨 위로 버튼 -->
            <el-backtop :right="40" :bottom="40" />
        </main>
    </div>
</template>

<script setup>
// 정적 페이지이므로 별도 로직 없음
</script>

<style scoped>
html {
    scroll-behavior: smooth;
}

:root {
    --bg: #f7f8fb;
    --card: #fff;
    --accent: #0b57d0;
    --muted: #666;
}

body {
    font-family: Inter, Roboto, "Noto Sans KR", Arial, sans-serif;
    margin: 0;
    background: var(--bg);
    color: #111;
}

header {
    background: linear-gradient(90deg, #0b57d0 0%, #1466ff 100%);
    color: #fff;
    padding: 28px 20px;
}

.container {
    max-width: 1000px;
    margin: 24px auto;
    padding: 0 20px;
}

.card {
    background: var(--card);
    border-radius: 12px;
    padding: 22px;
    box-shadow: 0 6px 20px rgba(18, 28, 49, 0.06);
    margin-bottom: 18px;
}

h1,
h2,
h3,
h4 {
    margin: 0 0 12px 0;
}

h1 {
    font-size: 20px;
}

h2 {
    font-size: 18px;
    color: var(--accent);
}

h4 {
    font-size: 15px;
    color: #333;
    margin-top: 16px;
}

p {
    line-height: 1.6;
    color: #222;
}

dl {
    margin: 12px 0;
    padding-left: 0;
}

dt {
    font-weight: 600;
    margin-top: 10px;
}

dd {
    margin: 6px 0 0 0;
    padding-left: 12px;
    color: var(--muted);
}

ul {
    margin: 8px 0 8px 16px;
    color: var(--muted);
}

.toc {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 8px;
}

.scrollable {
    padding-right: 12px;
}

footer {
    font-size: 13px;
    color: var(--muted);
    text-align: center;
    padding: 12px 0;
}

@media (max-width: 600px) {
    .container {
        padding: 0 12px;
    }

    .card {
        padding: 16px;
    }
}
</style>
