"use client";

import {
  createStyles,
  Header,
  HoverCard,
  Group,
  Text,
  SimpleGrid,
  Center,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  Flex,
  Skeleton,
} from "@mantine/core";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import phoneMobile from "@/assests/icons/mobil-menu/phoneMobile.svg";
import sellPhoneMobile from "@/assests/icons/mobil-menu/sellPhoneMobile.svg";
import storeMobile from "@/assests/icons/mobil-menu/storeMobile.svg";
import bayilikMobile from "@/assests/icons/mobil-menu/bayilikMobile.svg";
import userMobile from "@/assests/icons/mobil-menu/userMobile.svg";
import basketMobile from "@/assests/icons/mobil-menu/basketMobile.svg";
import logoutIcon from "@/assests/icons/mobil-menu/logout_icon.svg";
import logo from "@/assests/icons/mobil-menu/logo.svg";
import searchIcon from "@/assests/icons/search.svg";
import rightArrow from "@/assests/icons/mobil-menu/right_arrow.svg";
import { IconChevronDown } from "@tabler/icons-react";
import Image from "next/image";
import GMButton from "../GetDesign/GMButton";
import "../header/header.scss";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { selectTotalItems } from "@/app/store/features/pointOfSell/pointOfSellSlice";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: 42,
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    // ...theme.fn.hover({
    //   backgroundColor:
    //     theme.colorScheme === "dark"
    //       ? theme.colors.dark[6]
    //       : theme.colors.gray[0],
    // }),
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: -theme.spacing.md,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("md")]: {
      display: "none",
    },
  },
}));

export function HeaderMegaMenu({ openAuth, safeLogout }) {
  const pointOfSellState = useSelector((state) => state.pointOfSell);

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { classes, theme } = useStyles();

  const [shadow, setShadow] = useState(false);
  const [visible, setVisible] = useState(true);

  const { data: session } = useSession();

  useEffect(() => {
    let prevScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 80) {
        setVisible(currentScrollY < prevScrollY);
        prevScrollY = currentScrollY;
      } else {
        setVisible(true);
      }
      currentScrollY > 80 ? setShadow(true) : setShadow(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`header ${shadow ? "shadow" : ""}`}
      style={{
        transform: visible ? "translateY(0)" : "translateY(-100%)",
      }}
    >
      {/* Web */}
      <Header px="md" bg={"#314457"} style={{ borderBottom: "unset" }}>
        <Group
          position="apart"
          sx={{ height: "100%" }}
          style={{ flexWrap: "nowrap" }}
        >
          <div style={{ width: "96px" }} className={classes.hiddenDesktop}>
            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              className={`burger-width `}
            />
          </div>
          <div className={classes.hiddenMobile}>
            <div
              className="position-relative d-flex align-items-center"
              style={{ height: "36px", width: "76px" }}
            >
              <Link href="/">
                <Image src={logo} alt="Logo" width={130} />
              </Link>
            </div>
          </div>
          {/* Mobil logo */}
          <div className={classes.hiddenDesktop} style={{ flex: 1 }}>
            <div
              className=" position-relative"
              style={{ height: "44px", width: "100%" }}
            >
              <Link href="/">
                <Image
                  src={logo}
                  alt="Logo"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </Link>
            </div>
          </div>
          <Group
            sx={{ height: "100%" }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            <HoverCard
              width="100%"
              position="top"
              radius="md"
              shadow="md"
              margin="auto"
              align="center"
            >
              <HoverCard.Target>
                <Link
                  href="products"
                  className={`header-link ` + classes.link}
                  style={{ paddingLeft: "30px" }}
                >
                  <Text mr={10} fw={500}>
                    CEP TELEFONU
                  </Text>
                  <IconChevronDown size={16} color={"white"} />
                </Link>
              </HoverCard.Target>
              <HoverCard.Dropdown
                sx={{
                  overflow: "hidden",
                  margin: "auto",
                  top: "54px !important",
                }}
                className="ceptelefonu-hover"
              >
                <Flex
                  className="hovercard-flex"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <div className="howercard">
                    <SimpleGrid cols={1} verticalSpacing="xs">
                      <Text fz={14} fw={500} color="slate.9" mt={8}>
                        Apple
                      </Text>
                      <Link href={`/#`} key={" İphone 14"}>
                        <Text fz={14} fw={400} color="slate.5" mt={8}>
                          İphone 14
                        </Text>
                      </Link>
                      <Link href={`/#`} key={" İphone 14 Plus"}>
                        <Text fz={14} fw={400} color="slate.5" mt={8}>
                          İphone 14 Plus
                        </Text>
                      </Link>
                      <Link href={`/#`} key={" İphone 14 Pro"}>
                        <Text fz={14} fw={400} color="slate.5" mt={8}>
                          İphone 14 Pro
                        </Text>
                      </Link>
                      <Link href={`/#`} key={" İphone 14 Pro Max"}>
                        <Text fz={14} fw={400} color="slate.5" mt={8}>
                          İphone 14 Pro Max
                        </Text>
                      </Link>
                    </SimpleGrid>
                  </div>
                  <div className="howercard">
                    <SimpleGrid cols={1} verticalSpacing="xs">
                      <Text fz={14} fw={500} color="slate.9" mt={8}>
                        Samsung
                      </Text>
                      <Link href={`/#`} key={"Galaxy S Serisi"}>
                        <Text fz={14} fw={400} color="slate.5" mt={8}>
                          Galaxy S Serisi
                        </Text>
                      </Link>
                      <Link href={`/#`} key={"Galaxy Z Serisi"}>
                        <Text fz={14} fw={400} color="slate.5" mt={8}>
                          Galaxy Z Serisi
                        </Text>
                      </Link>
                      <Link href={`/#`} key={"Nova 11 Pro"}>
                        <Text fz={14} fw={400} color="slate.5" mt={8}>
                          Nova 11 Pro
                        </Text>
                      </Link>
                      <Link href={`/#`} key={"Nova 9 SE"}>
                        <Text fz={14} fw={400} color="slate.5" mt={8}>
                          Nova 9 SE
                        </Text>
                      </Link>
                    </SimpleGrid>
                  </div>
                  <div className="howercard">
                    <SimpleGrid cols={1} verticalSpacing="xs">
                      <Text fz={14} fw={500} color="slate.9" mt={8}>
                        Huawei
                      </Text>
                      <Link href={`/#`} key={"Mate 50 Pro"}>
                        <Text fz={14} fw={400} color="slate.5" mt={8}>
                          Mate 50 Pro
                        </Text>
                      </Link>
                      <Link href={`/#`} key={"Nova 10 Pro"}>
                        <Text fz={14} fw={400} color="slate.5" mt={8}>
                          Nova 10 Pro
                        </Text>
                      </Link>
                      <Link href={`/#`} key={"Galaxy A Serisi"}>
                        <Text fz={14} fw={400} color="slate.5" mt={8}>
                          Galaxy A Serisi
                        </Text>
                      </Link>
                      <Link href={`/#`} key={"Galaxy M Serisi"}>
                        <Text fz={14} fw={400} color="slate.5" mt={8}>
                          Galaxy M Serisi
                        </Text>
                      </Link>
                    </SimpleGrid>
                  </div>
                  <div className="howercard">
                    <SimpleGrid cols={1} verticalSpacing="xs">
                      <Text fz={14} fw={500} color="slate.9" mt={8}>
                        Xiaomi
                      </Text>
                      <Link href={`/#`} key={"12 Lite"}>
                        <Text fz={14} fw={400} color="slate.5" mt={8}>
                          12 Lite
                        </Text>
                      </Link>
                      <Link href={`/#`} key={"12 Pro"}>
                        <Text fz={14} fw={400} color="slate.5" mt={8}>
                          12 Pro
                        </Text>
                      </Link>
                      <Link href={`/#`} key={"12T"}>
                        <Text fz={14} fw={400} color="slate.5" mt={8}>
                          12T
                        </Text>
                      </Link>
                      <Link href={`/#`} key={"12T Pro"}>
                        <Text fz={14} fw={400} color="slate.5" mt={8}>
                          12T Pro
                        </Text>
                      </Link>
                    </SimpleGrid>
                  </div>
                </Flex>
              </HoverCard.Dropdown>
            </HoverCard>

            <Link
              href="/sat/telefon/"
              className={`header-link ` + classes.link}
              fw={500}
            >
              TELEFON SAT
            </Link>

            <Link
              href="/magazalarimiz/"
              className={`header-link ` + classes.link}
              fw={500}
            >
              MAĞAZALAR
            </Link>
            <Link
              href="/bayilik/"
              className={`header-link ` + classes.link}
              fw={500}
            >
              İŞ ORTAĞI OL
            </Link>
          </Group>
          <Group className={classes.hiddenMobile}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                borderBottom: 0,
                height: "fit-content",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            >
              <input
                className="header-search-input"
                type="text"
                placeholder="Cihaz Ara..."
                style={{
                  borderRadius: "8px",
                  padding: "8px",
                  width: "100%",
                  backgroundColor: "#fff",
                  border: "0.0625rem solid #9ca3af",
                }}
              />
              <Image
                src={searchIcon}
                alt="search"
                width={23}
                height={23}
                style={{
                  marginLeft: "-34px", // İkonu sola çekmek için
                  cursor: "pointer",
                }}
              />
            </div>

            {status === "loading" ? (
              <div
                className="d-flex justify-content-center"
                style={{ width: "135px" }}
              >
                <Skeleton height={24} width={24} circle radius="xl" />
                <Skeleton ml={6} height={24} width={63} radius="xl" />
              </div>
            ) : session?.user ? (
              <HoverCard
                width="auto"
                position="bottom"
                radius="md"
                shadow="md"
                withinPortal
              >
                <HoverCard.Target>
                  <Link
                    onClick={(e) => e.preventDefault()}
                    href=""
                    className={classes.link + " " + `ipad-padding`}
                    style={{
                      border: "0.0625rem solid transparent",
                      height: "2.25rem",
                      borderRadius: "5px",
                    }}
                  >
                    <Center inline>
                      <div
                        className="position-relative"
                        style={{
                          height: "20px",
                          width: "22px",
                          marginRight: "5px",
                        }}
                        total-quantity={pointOfSellState.localBasket.length}
                      >
                        <Image
                          src={userMobile}
                          alt="Profil"
                          fill
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                      <Box
                        component="span"
                        mr={10}
                        fw={500}
                        fz={14}
                        className="ipad-hidden"
                        style={{ cursor: "pointer", color: "#fff" }}
                      >
                        PROFİL
                      </Box>
                      <IconChevronDown size={16} color={"white"} />
                    </Center>
                  </Link>
                </HoverCard.Target>
                <HoverCard.Dropdown sx={{ overflow: "hidden" }}>
                  <Flex className="hovercard-flex">
                    <div className="howercard">
                      <SimpleGrid cols={1} verticalSpacing="xs">
                        <>
                          <div>
                            <Link
                              href={"/profil/aldiklarim/"}
                              style={{ textDecoration: "none" }}
                            >
                              <Text fz={14} fw={600} color="slate.5" mt={8}>
                                Siparişlerim
                              </Text>
                            </Link>
                            <Link
                              href={"/profil/sattiklarim/"}
                              style={{ textDecoration: "none" }}
                            >
                              <Text fz={14} fw={600} color="slate.5" mt={8}>
                                Sattıklarım
                              </Text>
                            </Link>
                            <Link
                              href={"/profil/begendiklerim/"}
                              style={{ textDecoration: "none" }}
                            >
                              <Text fz={14} fw={600} color="slate.5" mt={8}>
                                Beğendiklerim
                              </Text>
                            </Link>

                            <Link
                              href={"/profil/kullanici-bilgilerim/"}
                              style={{ textDecoration: "none" }}
                            >
                              <Text fz={14} fw={600} color="slate.5" mt={8}>
                                Kullanıcı Bilgilerim
                              </Text>
                            </Link>
                            <Text
                              fz={14}
                              fw={600}
                              color="slate.5"
                              mt={8}
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                safeLogout();
                              }}
                            >
                              Çıkış Yap
                            </Text>
                          </div>
                        </>
                      </SimpleGrid>
                    </div>
                  </Flex>
                </HoverCard.Dropdown>
              </HoverCard>
            ) : (
              <GMButton
                onClick={() => {
                  openAuth();
                }}
                style={{
                  padding: "0px 0.125rem",
                  backgroundColor: "transparent",
                }}
              >
                <div
                  className=" position-relative"
                  style={{ height: "22px", width: "22px" }}
                >
                  <Image
                    src={userMobile}
                    alt="Profil"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <Text ml={2} fw={500} fz={14} style={{ color: "#ffffff" }}>
                  GİRİŞ YAP
                </Text>
              </GMButton>
            )}

            <GMButton
              component="div"
              variant="subtle"
              style={{
                padding: "0",
                backgroundColor: "transparent",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <Link
                href="/sepetim/"
                prefetch={false}
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  color: "#000",
                  cursor: "pointer",
                }}
              >
                <div
                  className="desktopSepetIconContainer basket-total"
                  style={{
                    position: "relative",
                    height: "23px",
                    width: "35px",
                  }}
                  total-quantity={pointOfSellState.localBasket.length}
                >
                  <Image
                    src={basketMobile}
                    alt="Sepet"
                    fill
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </div>
                <Text
                  fw={500}
                  fz={14}
                  className="basketDesktopText ipad-hidden"
                  style={{
                    color: "#fff",
                  }}
                >
                  SEPETİM
                </Text>
              </Link>
            </GMButton>
          </Group>
          {/* Mobil sepet ve profil ikonları gelecek. */}
          <div className={classes.hiddenDesktop} style={{ width: "96px" }}>
            <Flex className="d-flex justify-content-end align-items-center gap-2">
              {session?.user ? (
                <Link href="/profil/">
                  <div
                    className=" position-relative mt-2"
                    style={{ height: "28px", width: "20px" }}
                  >
                    <Image
                      src={userMobile}
                      alt="Profil"
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </Link>
              ) : (
                <div
                  className=" position-relative mt-2"
                  style={{ height: "28px", width: "20px" }}
                  onClick={() => {
                    openAuth();
                  }}
                >
                  <Image
                    src={userMobile}
                    alt="Profil"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
              )}

              <div
                className=" position-relative mt-2 basket-total"
                style={{ height: "21px", width: "30px" }}
                total-quantity={pointOfSellState.localBasket.length}
              >
                <Link href="/sepetim/" className={classes.link}>
                  <Image
                    src={basketMobile}
                    alt="Sepet"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </Link>
              </div>
            </Flex>
          </div>
        </Group>
      </Header>
      {/* Web End */}

      {/* Mobil */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        withCloseButton={false}
        size="75%"
        padding="md"
        // closable={false}
        styles={(theme) => ({
          content: {
            backgroundColor: theme.colors.gray[10],
            borderRight: "1px solid black",
          },
          header: {
            backgroundColor: theme.colors.gray[10],
          },
        })}
        title={
          <div
            className=" position-relative"
            style={{
              height: "20px",
              width: "112px",
              padding: "2rem",
              marginLeft: "1rem",
            }}
          >
            <Image
              src={logo}
              alt="Logo"
              fill
              sizes="50vw"
              style={{ objectFit: "contain" }}
            />
          </div>
        }
        className={classes.hiddenDesktop}
        style={{ fontFamily: "" }}
      >
        <ScrollArea mx="-md">
          <hr style={{ margin: "0px", borderColor: "#000", opacity: "0.9" }} />
          <div className="d-flex justify-content-around align-items-center p-2">
            <div>
              {
                <div>
                  {session?.user ? (
                    <Link
                      href="/profil/aldiklarim/"
                      style={{ textDecoration: "none" }}
                    >
                      <div className="d-flex align-items-center">
                        <div
                          className=" position-relative"
                          style={{ height: "20px", width: "32px" }}
                        >
                          <Image
                            src={userMobile}
                            alt="Profil"
                            fill
                            style={{ objectFit: "contain" }}
                          />
                        </div>
                        <Text
                          ml={2}
                          fw={400}
                          fz={13}
                          color="slate-7"
                          className="ms-1 mt-1"
                        >
                          {`${session?.user?.name} ${session?.user?.lastname}`}
                        </Text>
                        <div
                          style={{ fontSize: "13px", marginTop: "5px" }}
                        ></div>
                      </div>
                    </Link>
                  ) : (
                    <div
                      className="d-flex align-items-center"
                      onClick={() => {
                        openAuth();
                      }}
                    >
                      <div
                        className=" position-relative"
                        style={{ height: "20px", width: "32px" }}
                      >
                        <Image
                          src={userMobile}
                          alt="Profil"
                          fill
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                      <Text
                        ml={2}
                        fw={400}
                        fz={13}
                        color="slate-7"
                        className="ms-1 mt-1"
                      >
                        Giriş Yap
                      </Text>
                    </div>
                  )}
                </div>
              }
            </div>
            <div>
              <GMButton
                color="slate.9"
                variant="subtle"
                style={{
                  padding: "0px 0.125rem",
                  backgroundColor: "transparent",
                }}
              >
                <Link
                  href="/sepetim/"
                  className={classes.link}
                  style={{ paddingLeft: "0" }}
                  onClick={closeDrawer}
                >
                  <div
                    className=" position-relative basket-total"
                    style={{ height: "21px", width: "30px" }}
                    total-quantity={pointOfSellState.localBasket.length}
                  >
                    <Image
                      src={basketMobile}
                      alt="Sepet"
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <Text
                    ml={2}
                    fw={400}
                    fz={13}
                    color="slate-7"
                    className="ms-1 mt-1"
                  >
                    Sepetim
                  </Text>
                </Link>
              </GMButton>
            </div>
          </div>
          <hr
            style={{ marginTop: "0px", borderColor: "#000", opacity: "0.9" }}
          />
          <div
            style={{
              padding: "0px 0.5rem",
              marginTop: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <Link
              href="/products"
              className={classes.link}
              style={{
                height: "48px",
              }}
              onClick={closeDrawer}
            >
              <div className="d-flex align-items-center gap-3">
                <div
                  className=" position-relative"
                  style={{
                    height: "26px",
                    width: "26px",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src={phoneMobile}
                    alt="Phone Mobile"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <Text fz={18} fw={500} color="slate-9">
                  Cep Telefonu
                </Text>
              </div>
              <div
                className=" position-relative"
                style={{
                  height: "24px",
                  width: "24px",
                  alignItems: "center",
                }}
              >
                <Image
                  src={rightArrow}
                  alt="Right Arrow"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </Link>

            <Link
              href="/sat/telefon/"
              className={classes.link}
              style={{ height: "48px" }}
              onClick={closeDrawer}
            >
              <div className="d-flex align-items-center gap-3">
                <div
                  className=" position-relative"
                  style={{
                    height: "26px",
                    width: "26px",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src={sellPhoneMobile}
                    alt="Sell Phone Mobile"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <Text fz={18} fw={500} color="slate-9" className="mt-1">
                  Telefon Sat
                </Text>
              </div>
              <div
                className=" position-relative"
                style={{
                  height: "24px",
                  width: "24px",
                  alignItems: "center",
                }}
              >
                <Image
                  src={rightArrow}
                  alt="Right Arrow"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </Link>

            <Link
              href="/magazalarimiz/"
              className={classes.link}
              style={{ height: "48px" }}
              onClick={closeDrawer}
            >
              <div className="d-flex align-items-center gap-3">
                <div
                  className=" position-relative"
                  style={{
                    height: "26px",
                    width: "26px",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src={storeMobile}
                    alt="Store Mobile"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <Text fz={18} fw={500} color="slate-9">
                  Mağazalar
                </Text>
              </div>
              <div
                className=" position-relative"
                style={{
                  height: "24px",
                  width: "24px",
                  alignItems: "center",
                }}
              >
                <Image
                  src={rightArrow}
                  alt="Right Arrow"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </Link>

            <Link
              href="/bayilik/"
              className={classes.link}
              style={{ height: "48px" }}
              onClick={closeDrawer}
            >
              <div className="d-flex align-items-center gap-3">
                <div
                  className=" position-relative"
                  style={{
                    height: "26px",
                    width: "26px",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src={bayilikMobile}
                    alt="Bayilik Mobile"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <Text fz={18} fw={500} color="slate-9">
                  Bayilik
                </Text>
              </div>
              <div
                className="position-relative"
                style={{
                  height: "24px",
                  width: "24px",
                  alignItems: "center",
                }}
              >
                <Image
                  src={rightArrow}
                  alt="Right Arrow"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </Link>
          </div>
          <div className="position-fixed bottom-0 d-flex justify-content-center w-100 text-center my-5">
            {session?.user ? (
              <div className="d-flex align-items-center gap-2">
                <div
                  className=" position-relative"
                  style={{
                    height: "23px",
                    width: "23px",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src={logoutIcon}
                    alt="Logout Icon"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <Text
                  fz={16}
                  fw={500}
                  color="slate-9"
                  onClick={() => {
                    safeLogout();
                  }}
                >
                  Çıkış Yap
                </Text>
              </div>
            ) : null}
          </div>
        </ScrollArea>
      </Drawer>
      <div
        height={50}
        px="md"
        mt={10}
        style={{
          borderBottom: 0,
          paddingLeft: "1.25rem",
          paddingRight: "1.25rem",
          height: "fit-content",
          marginBottom: "10px",
        }}
        className={classes.hiddenDesktop}
      >
        <div
          style={{
            borderBottom: 0,
            height: "fit-content",
            marginBottom: "10px",
            marginTop: "10px",
          }}
        >
          <input
            className="header-search-input"
            type="text"
            placeholder="Cihaz Ara..."
            style={{
              borderRadius: "8px",
              padding: "8px",
              width: "100%",
              backgroundColor: "#fff",
              border: "0.0625rem solid #9ca3af",
            }}
          />
          <Image
            src={searchIcon}
            alt="search"
            width={23}
            height={23}
            style={{
              marginLeft: "-34px",
              cursor: "pointer",
            }}
          />
        </div>
      </div>
      {/* Mobil End */}
    </header>
  );
}
