<template>
    <div>
        <h2>게시판 요약</h2>
        <PostCount :count="1" />
        <PostCount :count="123" label="기업별 정보 공유 게시물" />
        <PostCount :count="45" label="공지사항" />
        <PostCount :count="12" label="질문글" />
    </div>
</template>
