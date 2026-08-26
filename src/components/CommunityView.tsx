import React, { useState } from 'react';
import { CommunityPost } from '../types';

interface CommunityViewProps {
  posts: CommunityPost[];
}

export const CommunityView: React.FC<CommunityViewProps> = ({ posts: initialPosts }) => {
  const [posts, setPosts] = useState<CommunityPost[]>(initialPosts);
  const [selectedTag, setSelectedTag] = useState<string>('전체');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [isWriting, setIsWriting] = useState(false);

  const tags = ['전체', '합격 수기', '면접 스터디', '질문 & 답변', 'NCS 팁', '가점 공유'];

  const filteredPosts = posts.filter((p) => {
    if (selectedTag === '전체') return true;
    return p.category === selectedTag || p.tags.includes(selectedTag);
  });

  const handleLike = (id: string) => {
    setPosts(
      posts.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      author: '나 (김준호)',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMXGVNUPVwUfrUfvIoktDNTCuQ5jeMBk0zbpDxMmqDNR77_GAfVdBKUgS5aS1xaeexheTJLY2Hw6i_pmaSSGw_QyK71UmYD7O1JXcHuZbD7VcxDkvsUuQ-_YXJfbiWrT5Kt01Lm-LtHRWnQxhH-NsvqKqVWK8V7-1uL_RsBFJp1Ub9D5UqIUuSTdswpHuy_D7IVoodWoYHzHgoLMN762xwExQCs3H2MFrcGK3-k1md8jatjDtHhKJc',
      category: '질문 & 답변',
      title: newTitle,
      content: newContent,
      likes: 0,
      commentsCount: 0,
      createdAt: '방금 전',
      tags: ['취준생', '공기업준비'],
    };

    setPosts([newPost, ...posts]);
    setNewTitle('');
    setNewContent('');
    setIsWriting(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-24">
      {/* Header */}
      <section className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#191c1d]">취준생 커뮤니티</h2>
          <p className="text-sm text-[#434654] mt-0.5">
            합격 수기, 면접 스터디 모집 및 서류 가점 실시간 정보 교류
          </p>
        </div>
        <button
          onClick={() => setIsWriting(!isWriting)}
          className="px-4 py-2.5 bg-[#003fb1] hover:bg-[#002d80] text-white rounded-xl text-xs font-bold transition-colors shadow-xs flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[18px]">edit</span>
          글쓰기
        </button>
      </section>

      {/* Writing Box Form */}
      {isWriting && (
        <form
          onSubmit={handleCreatePost}
          className="bg-white rounded-2xl p-5 border border-[#003fb1]/30 shadow-md space-y-3 animate-fadeIn"
        >
          <h3 className="text-sm font-bold text-[#003fb1]">새 게시글 작성</h3>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#c3c5d7] rounded-xl text-sm focus:ring-2 focus:ring-[#003fb1] outline-none"
          />
          <textarea
            rows={3}
            placeholder="공유하고 싶은 이야기, 질문, 스터디 모집 내용을 적어주세요..."
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#f8f9fa] border border-[#c3c5d7] rounded-xl text-sm focus:ring-2 focus:ring-[#003fb1] outline-none resize-none"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsWriting(false)}
              className="px-4 py-2 bg-[#edeeef] text-[#434654] rounded-xl text-xs font-semibold"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#003fb1] text-white rounded-xl text-xs font-bold hover:bg-[#002d80]"
            >
              등록하기
            </button>
          </div>
        </form>
      )}

      {/* Tags Filter */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedTag === tag
                ? 'bg-[#003fb1] text-white shadow-xs'
                : 'bg-white border border-[#c3c5d7] text-[#434654] hover:bg-[#edeeef]'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Post List */}
      <div className="space-y-3.5">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-2xl p-5 border border-[#e1e3e4] shadow-[0px_4px_12px_rgba(0,0,0,0.05)] hover:border-[#003fb1]/30 transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-[#e1e3e4] border border-[#c3c5d7]">
                  <img
                    src={post.avatar}
                    alt={post.author}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#191c1d]">{post.author}</p>
                  <p className="text-[10px] text-[#737686]">{post.createdAt}</p>
                </div>
              </div>
              <span className="text-[11px] font-bold text-[#003fb1] bg-[#dbe1ff] px-2.5 py-0.5 rounded-full">
                {post.category}
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#191c1d] mb-1.5">{post.title}</h3>
              <p className="text-xs md:text-sm text-[#434654] leading-relaxed line-clamp-3">
                {post.content}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] text-[#737686] bg-[#f8f9fa] px-2 py-0.5 rounded-md border border-[#e1e3e4]"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#f3f4f5] text-xs text-[#737686]">
              <button
                onClick={() => handleLike(post.id)}
                className="flex items-center gap-1 hover:text-[#ba1a1a] transition-colors"
              >
                <span className="material-symbols-outlined text-[16px] text-[#ba1a1a] fill-1">
                  favorite
                </span>
                좋아요 {post.likes}
              </button>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">chat_bubble</span>
                댓글 {post.commentsCount}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
