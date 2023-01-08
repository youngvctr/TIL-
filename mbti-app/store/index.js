export const state = {
    page: 0,
    questions: [
        {
            q: "나는 주로 클라이밍장에",
            a: [
                {
                    text: "내가 가고 싶은 날로 아무때나 간다",
                    value: "p"
                },
                {
                    text: '주말이나 쉬는 날로 정해서 간다',
                    value: 'j'
                }
            ]
        },
        {

            q: "오늘은 클라이밍 가는날!",
            a: [
                {
                    text: "사람들과 시간을 맞춰볼까?",
                    value: "e"
                },
                {
                    text: '내가 원하는 시간에 간다',
                    value: 'i'
                }
            ]
        },
        {
            q: "클라이밍 장에 도착한 뒤 ",
            a: [
                {
                    text: "나만의 루틴으로 운동을 준비한다.",
                    value: "j"
                },
                {
                    text: '이번에 바뀐 벽이 어디더라! 바뀐 벽부터 스캔한다.',
                    value: 'p'
                }
            ]
        },
        {
            q: "내가 주로 입는 클라이밍 복장",
            a: [
                {
                    text: "심사숙고해서 산 유니크한 티셔츠",
                    value: "i"
                },
                {
                    text: '(쓱-싹이가 그려진)귀여운 크루 티셔츠',
                    value: 'e'
                }
            ]
        },
        {
            q: "볼더링 문제가 잘 풀리지 않을 때 나는",
            a: [
                {
                    text: "이런 문제는 다음에 풀지 뭐~",
                    value: "p"
                },
                {
                    text: '풀릴 때까지 푼 게 아니니 끝까지 푼다.',
                    value: 'j'
                }
            ]
        },
        {
            q: "클라이밍장에서 아는 사람을 만났을 때 나는",
            a: [
                {
                    text: "풀던 문제가 있으니 인사만 가볍게!",
                    value: "t"
                },
                {
                    text: '(내적 친밀감을 표출하며) OO님!!! 완!전! 오랜만이에요~~',
                    value: 'f'
                }
            ]
        },
        {
            q: "풀리지 않던 문제가 결국 풀림! ",
            a: [
                {
                    text: "당장 인스타그램 게시물, 스토리에 박제! 신난다! ",
                    value: "f"
                },
                {
                    text: '만족할 수 없음. 올클을 안했잖아?',
                    value: 't'
                }
            ]
        },
        {
            q: "이번 주말에 다른 클라이밍장으로 원정을 갈 때 나는 ",
            a: [
                {
                    text: "해시태그로 검색한 후 문제들을 쭉 스캔한다.",
                    value: "n"
                },
                {
                    text: '팔로우 한 사람들 중에 나와 비슷한 사람을 찾아본다.',
                    value: 's'
                }
            ]
        },
        {
            q: "사람들이 붐비는 곳에서는",
            a: [
                {
                    text: "벽에 붙는 게 크럭스라고 받아들임",
                    value: "i"
                },
                {
                    text: '달려가서 재빠르게 스타트 쥐기',
                    value: 'e'
                }
            ]
        },
        {
            q: "인스타그램에 클라이밍 영상을 올리면서 게시글을 적을 때",
            a: [
                {
                    text: "해시태그가 게시글의 50% 이상이 되도록 적는다.",
                    value: "s"
                },
                {
                    text: '해시태그는 사치! 생각을 주로 적는다.',
                    value: 'n'
                }
            ]
        },
        {
            q: "클라이밍을 할 때 나는 주로 ",
            a: [
                {
                    text: "다른 사람들의 루트 파인딩을 모방한다.",
                    value: "n"
                },
                {
                    text: '나만의 방법으로 푼다.',
                    value: 's'
                }
            ]
        },
        {
            q: "휴! 오늘은 행클했다! 운동을 마친 후",
            a: [
                {
                    text: "집에 가서 스트레칭과 마사지로 쿨다운 Go!",
                    value: "i"
                },
                {
                    text: '깐부치킨에서 사람들과 맥주를 마시며 쿨다운 Go!',
                    value: 'e'
                }
            ]
        },
        {
            q: "존버중인 문제의 홀드를 닦는 누군가를 볼 때",
            a: [
                {
                    text: "그냥 바라본다",
                    value: "i"
                },
                {
                    text: '달려가서 쓱싹 닦아준다',
                    value: 'e'
                }
            ]
        },
        {
            q: "클라이밍을 다녀온 날 잠들기 전에 주로 ",
            a: [
                {
                    text: "오늘 올라온 클라이밍 영상을 쭉 훑어본다.",
                    value: "f"
                },
                {
                    text: '오늘 내가 푼 문제 10000번 정도 본다.',
                    value: 't'
                }
            ]
        },
        {
            q: "부상을 당했을 때 나는",
            a: [
                {
                    text: "부상이 뭐예요? 가볍게 무시",
                    value: "p"
                },
                {
                    text: '다 나을 때까지 재활 Go!',
                    value: 'j'
                }
            ]
        },
        {
            q: "스포츠클라이밍 월드컵이 열리면",
            a: [
                {
                    text: "실시간 혹은 보고싶은 선수 경기만 찾아본다",
                    value: "j"
                },
                {
                    text: '언젠데요 공유좀',
                    value: 'p'
                }
            ]
        },
    ],
    result: {
        e: 0,
        i: 0,
        s: 0,
        n: 0,
        t: 0,
        f: 0,
        p: 0,
        j: 0
    }
}

export const mutations = {
    SET_USER_TYPE(state, type) {
        state.result[type] += 1;
        state.page += 1;
    },
    SET_PAGE(state, page) {
        state.page = page;
    },
    PAGE_RESET(state) {
        state.page = 0;
        state.result = {
            e: 0,
            i: 0,
            s: 0,
            n: 0,
            t: 0,
            f: 0,
            p: 0,
            j: 0
        };
    }
}

export const actions = {
    clickButton({ commit }, type) {
        commit("SET_USER_TYPE", type)
    },
    clickResetButton({ commit }) {
        commit("PAGE_RESET")
    }
}