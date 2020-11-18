import styled from 'styled-components'

const Cards = styled.div`
                        margin-top: 30px;
                        &>div {
                            width: calc((100% - 45px) / 4);
                            height: 130px;
                            background: #FFF;
                            border-radius: 10px;
                        }
                    `;

const Card = styled.div`
                        &:first-of-type>div>div:first-of-type {
                            background: rgba(251, 185, 0, 0.3);
                        }
                        &:nth-of-type(2)>div>div:first-of-type {
                            background: rgba(93, 38, 132, 0.3);
                        }
                        &:nth-of-type(3)>div>div:first-of-type {
                            background: rgba(67, 207, 89, 0.3);
                        }
                        &:nth-of-type(4)>div>div:first-of-type {
                            background: rgba(51, 110, 214, 0.3);
                        }
                    `;

export { Cards, Card }
